import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { vi } from "vitest";
import App from "./App";
import { portfolio } from "./portfolioData";

const appStyles = readFileSync("src/App.css", "utf8");

describe("Bruce Tang portfolio", () => {
  it("renders the approved continuous portfolio structure", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /唐梦龙.*AI 影像创意导演/,
      }),
    ).toBeInTheDocument();
    const hero = screen.getByTestId("hero");

    for (const label of [
      "个人标签",
      "个人简介",
      "个人经历",
      "一张照片被世界看见",
      "摄影作品",
      "项目索引",
      "作品放映",
      "个人优势",
      "AI 共创成果",
      "联系合作",
    ]) {
      expect(screen.getByRole("heading", { name: label })).toBeInTheDocument();
    }

    expect(screen.getByLabelText("主导航")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "联系" })).toHaveAttribute(
      "href",
      "#contact",
    );
    expect(screen.getByRole("link", { name: "作品视频" })).toHaveAttribute(
      "href",
      "#screening",
    );
    expect(screen.getByRole("link", { name: "摄影作品" })).toHaveAttribute(
      "href",
      "#unsplash-impact",
    );
    expect(screen.getByRole("link", { name: "项目索引" })).toHaveAttribute(
      "href",
      "#work-index",
    );
    expect(screen.getByRole("link", { name: "AI 共创" })).toHaveAttribute(
      "href",
      "#ai-builds",
    );
    expect(screen.getByRole("link", { name: /发送邮件/ })).toHaveAttribute(
      "href",
      `mailto:${portfolio.contact.email}`,
    );
  });

  it("keeps the approved career-to-work-to-photography sequence", () => {
    render(<App />);

    const profile = document.querySelector("#profile");
    const strengths = document.querySelector("#strengths");
    const experience = document.querySelector("#experience");
    const workIndex = screen.getByTestId("work-index");
    const screening = screen.getByTestId("screening");
    const impact = screen.getByTestId("unsplash-impact");
    const transition = screen.getByTestId("photography-transition");
    const photography = screen.getByTestId("photography");
    const aiBuilds = screen.getByTestId("ai-builds");
    const photos = within(photography).getAllByRole("img");

    expect(profile.nextElementSibling).toBe(strengths);
    expect(strengths.nextElementSibling).toBe(experience);
    expect(experience.nextElementSibling).toBe(workIndex);
    expect(workIndex.nextElementSibling).toBe(screening);
    expect(screening.nextElementSibling).toBe(impact);
    expect(impact.nextElementSibling).toBe(transition);
    expect(transition.nextElementSibling).toBe(photography);
    expect(photography.nextElementSibling).toBe(aiBuilds);
    expect(photos).toHaveLength(14);
    expect(photos.every((photo) => photo.getAttribute("src")?.startsWith("/assets/photo-"))).toBe(
      true,
    );
    const impactMetrics = within(impact).getByLabelText("Unsplash 作品传播数据");
    expect(impactMetrics).toHaveTextContent("1200万");
    expect(impactMetrics).toHaveTextContent("12万");
    expect(within(impact).getByRole("img")).toHaveAttribute(
      "src",
      portfolio.unsplashImpact.image,
    );
  });

  it("shows three AI-built outcomes immediately before the contact page", () => {
    render(<App />);

    const builds = screen.getByTestId("ai-builds");
    const contact = document.querySelector("#contact");

    expect(builds.nextElementSibling).toBeNull();
    expect(builds.parentElement.nextElementSibling).toBe(contact);
    expect(within(builds).getAllByRole("article")).toHaveLength(3);
    expect(within(builds).getAllByRole("img")).toHaveLength(6);
    expect(within(builds).getByText("Skill Signal Console")).toBeInTheDocument();
    expect(within(builds).getByText("《返乡》剧本分镜")).toBeInTheDocument();
  });

  it("uses a loop plate with only the approved identity typography", () => {
    render(<App />);

    const hero = screen.getByTestId("hero");
    expect(within(hero).getByTestId("hero-type")).toHaveTextContent(
      "BRUCETANG唐梦龙AI 影像创意导演AI MOVING IMAGECREATIVE DIRECTOR",
    );
    expect(within(hero).getByTestId("hero-poster")).toHaveAttribute(
      "src",
      portfolio.hero.poster,
    );
    expect(within(hero).queryByText("查看项目")).not.toBeInTheDocument();
    expect(within(hero).queryByText("发送邮件")).not.toBeInTheDocument();
    expect(within(hero).queryByText("Transition Target")).not.toBeInTheDocument();
    expect(within(hero).queryByText(portfolio.hero.subline)).not.toBeInTheDocument();
  });

  it("keeps every full-bleed hero media layer anchored to all four edges", () => {
    const ruleStart = appStyles.indexOf(".hero-poster,");
    const ruleEnd = appStyles.indexOf("}", ruleStart);
    const mediaRule = appStyles.slice(ruleStart, ruleEnd + 1);

    expect(ruleStart).toBeGreaterThanOrEqual(0);
    expect(mediaRule).toContain("inset: 0");
    expect(mediaRule).toContain("width: 100%");
    expect(mediaRule).toContain("height: 100%");
    expect(mediaRule).not.toContain("transform:");
  });

  it("keeps the hero loop running while the interface is available immediately", () => {
    render(<App />);

    const hero = screen.getByTestId("hero");
    const video = within(hero).getByTestId("hero-loop-video");
    const foreground = within(hero).getByTestId("hero-foreground-video");
    const nav = within(hero).getByLabelText("主导航");

    expect(hero).toHaveAttribute("data-hero-mode", "loop");
    expect(nav).not.toHaveAttribute("aria-hidden");
    expect(video).toHaveAttribute("src", portfolio.hero.video);
    expect(video).toHaveAttribute("poster", portfolio.hero.poster);
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("loop");
    expect(video.muted).toBe(true);
    expect(foreground).toHaveAttribute(
      "src",
      "/assets/hero-loop-foreground.webm",
    );
    expect(foreground).toHaveAttribute("loop");
    expect(foreground.muted).toBe(true);
  });

  it("switches the highlighted experience from the timeline", () => {
    render(<App />);

    const timeline = screen.getByLabelText("工作经历时间线");
    fireEvent.click(within(timeline).getByRole("button", { name: /36氪/ }));

    const experience = screen.getByTestId("experience-stage");
    expect(within(experience).getByText("2020 — 2021")).toBeInTheDocument();
    expect(within(experience).getByText("36氪")).toBeInTheDocument();
    expect(within(experience).getByText(/氪星研究所/)).toBeInTheDocument();
  });

  it("switches experience and project previews on hover or keyboard focus", () => {
    render(<App />);

    const timeline = screen.getByLabelText("工作经历时间线");
    fireEvent.pointerEnter(within(timeline).getByRole("button", { name: /电影小镇/ }));
    expect(within(screen.getByTestId("experience-stage")).getByText("电影小镇")).toBeInTheDocument();

    const index = screen.getByTestId("work-index");
    const project = within(index).getByRole("button", { name: /国聘\+CCTV6政企品牌视频矩阵/ });
    fireEvent.focus(project);
    expect(project).toHaveAttribute("aria-pressed", "true");
  });

  it("keeps the complete career timeline in chronological order", () => {
    render(<App />);

    const timeline = screen.getByLabelText("工作经历时间线");
    const labels = within(timeline)
      .getAllByRole("button")
      .map((button) => button.textContent.replace(/\s+/g, " ").trim());

    expect(labels).toHaveLength(5);
    expect(labels[0]).toMatch(/2017 — 2018.*电影小镇/);
    expect(labels[1]).toMatch(/2018 — 2019.*CCTV6/);
    expect(labels[2]).toMatch(/2020 — 2021.*36氪/);
    expect(labels[3]).toMatch(/2022 — 2025.*国投人力/);
    expect(labels[4]).toMatch(/2025 — 2026.*新东方/);
  });

  it("uses two profile portraits and switches the stacked New Oriental images", () => {
    render(<App />);

    const profile = screen.getByRole("region", { name: "个人简介" });
    expect(within(profile).getAllByRole("img")).toHaveLength(2);
    expect(within(profile).getByText(portfolio.profile.summary)).toHaveTextContent(
      /^从商业视频/,
    );

    const experience = screen.getByTestId("experience-stage");
    expect(
      within(experience).getByRole("img", {
        name: "新东方欧亚教育项目作品封面",
      }),
    ).toBeInTheDocument();

    fireEvent.click(
      within(experience).getByRole("button", {
        name: "查看下一张新东方项目图片",
      }),
    );

    expect(
      within(experience).getByRole("img", {
        name: "新东方欧亚教育项目访谈拍摄现场",
      }),
    ).toBeInTheDocument();
  });

  it("keeps the highlighted experience title concise", () => {
    render(<App />);

    const experience = screen.getByTestId("experience-stage");
    expect(
      within(experience).getByRole("heading", {
        level: 4,
        name: "核心项目总编导",
      }),
    ).toBeInTheDocument();
    expect(within(experience).queryByText(/视频拍剪师/)).not.toBeInTheDocument();
    expect(within(experience).queryByText(/高管访谈/)).not.toBeInTheDocument();
  });

  it("keeps the complete work index visible without category filters", () => {
    render(<App />);

    const index = screen.getByTestId("work-index");
    expect(within(index).getAllByRole("button")).toHaveLength(
      portfolio.projects.length,
    );
    expect(within(index).queryByLabelText("项目筛选")).not.toBeInTheDocument();
  });

  it("keeps the screening wall still until a visitor chooses a video", () => {
    const play = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockResolvedValue(undefined);
    const pause = vi
      .spyOn(window.HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => {});

    render(<App />);

    const screening = screen.getByTestId("screening");
    const videos = within(screening).getAllByTestId(/screening-video-/);
    const cards = within(screening).getAllByTestId(/screening-card-/);
    expect(videos).toHaveLength(2);
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveClass("screening-card-primary");
    expect(cards[1]).toHaveClass("screening-card-secondary");
    expect(within(screening).getAllByText("16:9")).toHaveLength(2);
    expect(within(screening).queryByText("9:16")).not.toBeInTheDocument();
    videos.forEach((video) => expect(video).not.toHaveAttribute("autoplay"));

    fireEvent.click(
      within(screening).getByRole("button", {
        name: "播放 AI 短片《返乡》",
      }),
    );
    expect(play).toHaveBeenCalledTimes(1);

    fireEvent.click(
      within(screening).getByRole("button", {
        name: "播放 导演作品集 2026",
      }),
    );
    expect(pause).toHaveBeenCalled();
    expect(play).toHaveBeenCalledTimes(2);

    play.mockRestore();
    pause.mockRestore();
  });

  it("keeps native controls available when a browser blocks immediate playback", async () => {
    const play = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockRejectedValue(new DOMException("Playback blocked", "NotAllowedError"));

    render(<App />);

    const screening = screen.getByTestId("screening");
    const video = within(screening).getByTestId("screening-video-homeward");
    await act(async () => {
      fireEvent.click(
        within(screening).getByRole("button", {
          name: "播放 AI 短片《返乡》",
        }),
      );
      await Promise.resolve();
    });

    expect(video).toHaveAttribute("controls");
    play.mockRestore();
  });
});
