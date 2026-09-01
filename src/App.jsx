import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Menu, Play, X } from "lucide-react";
import { portfolio } from "./portfolioData";
import { assetPath } from "./assetPath";

const photographyFrames = [
  ...portfolio.photography.leftRail,
  ...portfolio.photography.rightRail,
];

const mobilePhotographyFrameLayouts = [
  "wide",
  "inset",
  "right",
  "full",
  "left",
  "inset",
  "wide",
  "right",
  "left",
  "full",
  "inset",
  "wide",
  "right",
  "left",
];

const filmFlightPaths = [
  { sx: -0.18, sy: 0.18, ex: -0.64, ey: -0.38, sr: -5, er: -29, delay: 0 },
  { sx: -0.1, sy: 0.24, ex: -0.43, ey: -0.62, sr: 3, er: 18, delay: 0.03 },
  { sx: -0.03, sy: 0.17, ex: -0.19, ey: -0.7, sr: -2, er: -14, delay: 0.06 },
  { sx: 0.04, sy: 0.22, ex: 0.08, ey: -0.66, sr: 4, er: 11, delay: 0.02 },
  { sx: 0.11, sy: 0.16, ex: 0.34, ey: -0.58, sr: -3, er: 24, delay: 0.08 },
  { sx: 0.18, sy: 0.23, ex: 0.61, ey: -0.36, sr: 6, er: 32, delay: 0.04 },
  { sx: -0.14, sy: 0.3, ex: -0.56, ey: -0.08, sr: 2, er: 20, delay: 0.11 },
  { sx: 0, sy: 0.31, ex: -0.03, ey: -0.43, sr: -4, er: -19, delay: 0.13 },
  { sx: 0.14, sy: 0.29, ex: 0.54, ey: -0.04, sr: 3, er: -22, delay: 0.1 },
];

const mobileAdvantages = [
  {
    id: "editing",
    label: "剪辑思维",
    visual: assetPath("assets/optimized/tag-advantages/strength-card-01-approved.png"),
    alt: "剪辑思维横幅：荧黄标题覆盖剪辑台画面",
  },
  {
    id: "aigc",
    label: "AIGC工作流",
    visual: assetPath("assets/optimized/tag-advantages/strength-card-02.png"),
    alt: "AIGC工作流横幅：中文像素字体与工作流画布",
  },
  {
    id: "directing",
    label: "导演控场",
    visual: assetPath("assets/optimized/tag-advantages/strength-card-03.png"),
    alt: "导演控场横幅：片场画面与四字切片",
  },
  {
    id: "delivery",
    label: "高效交付",
    visual: assetPath("assets/optimized/tag-advantages/strength-card-04.png"),
    alt: "高效交付横幅：握手成交画面与单行标题",
  },
];

function AdvantageCardArt({ advantage }) {
  if (advantage.id === "editing") {
    return <img className="mobile-advantage-art" src={advantage.visual} alt={advantage.alt} loading="lazy" />;
  }

  if (advantage.id === "aigc") {
    return (
      <div
        className="mobile-advantage-art mobile-advantage-art-composite mobile-advantage-art-aigc"
        role="img"
        aria-label={advantage.alt}
      >
        <img
          className="mobile-advantage-composite-photo"
          src={assetPath("assets/optimized/tag-advantages/aigc-workflow-board.png")}
          alt=""
          aria-hidden="true"
        />
        <span className="mobile-advantage-composite-number" aria-hidden="true">02</span>
        <span className="mobile-advantage-composite-timeline" aria-hidden="true" />
        <span className="mobile-advantage-composite-title mobile-advantage-composite-title-a" aria-hidden="true">AIGC</span>
        <span className="mobile-advantage-composite-title mobile-advantage-composite-title-b" aria-hidden="true">工作流</span>
        <span className="mobile-advantage-composite-footer" aria-hidden="true">
          <span>PROMPT</span><span>GENERATE</span><span>SELECT</span>
        </span>
      </div>
    );
  }

  if (advantage.id === "delivery") {
    return (
      <div
        className="mobile-advantage-art mobile-advantage-art-composite mobile-advantage-art-delivery"
        role="img"
        aria-label={advantage.alt}
      >
        <img
          className="mobile-advantage-composite-photo"
          src={assetPath("assets/optimized/tag-advantages/handshake-delivery-v1.png")}
          alt=""
          aria-hidden="true"
        />
        <span className="mobile-advantage-composite-number" aria-hidden="true">04</span>
        <span className="mobile-advantage-composite-timeline" aria-hidden="true" />
        <span className="mobile-advantage-delivery-title" aria-hidden="true">
          <span className="is-muted">高</span><span>效</span><span className="is-muted">交</span><span>付</span>
        </span>
        <span className="mobile-advantage-composite-footer" aria-hidden="true">
          <span>PLAN</span><span>CHECK</span><span>FINAL</span>
        </span>
      </div>
    );
  }

  return (
    <img
      className="mobile-advantage-art"
      src={advantage.visual}
      alt={advantage.alt}
      loading="lazy"
    />
  );
}

function SectionMarker({ index, label, light = false, separator = true }) {
  return (
    <p className={`section-marker${light ? " section-marker-light" : ""}`}>
      <span>{index}</span>
      {separator ? <span>/</span> : null}
      <span>{label}</span>
    </p>
  );
}

function MobilePageHeader({ title, index, label, light = false }) {
  return (
    <div className={`mobile-page-header${light ? " mobile-page-header-light" : ""}`} aria-hidden="true">
      <span>{title}</span>
      <SectionMarker index={index} label={label} light={light} />
    </div>
  );
}

function App() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const usesWebKitVideoFallback =
    typeof navigator !== "undefined" &&
    /AppleWebKit/i.test(navigator.userAgent) &&
    !/(Chrome|Chromium|Edg|OPR)/i.test(navigator.userAgent);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeExperience, setActiveExperience] = useState(
    portfolio.profile.timeline.length - 1,
  );
  const [activeExperienceImage, setActiveExperienceImage] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [activeScreening, setActiveScreening] = useState(null);
  const [screeningLightbox, setScreeningLightbox] = useState(null);
  const [isCompactViewport, setIsCompactViewport] = useState(() =>
    typeof window !== "undefined" &&
    Boolean(window.matchMedia?.("(max-width: 820px)")?.matches),
  );
  const [heroIntroComplete, setHeroIntroComplete] = useState(
    () => {
      if (
        typeof window === "undefined" ||
        !window.matchMedia?.("(max-width: 820px)")?.matches
      ) {
        return true;
      }

      try {
        return window.sessionStorage.getItem("portfolio-hero-intro-complete") === "1";
      } catch {
        return false;
      }
    },
  );
  const [heroIntroVideoReady, setHeroIntroVideoReady] = useState(false);
  const heroVideoRef = useRef(null);
  const heroForegroundVideoRef = useRef(null);
  const heroMobileIntroRef = useRef(null);
  const lightboxVideoRef = useRef(null);
  const photographyRef = useRef(null);
  const photographyStickyRef = useRef(null);
  const photographyLeftRef = useRef(null);
  const photographyRightRef = useRef(null);
  const photographyTransitionRef = useRef(null);
  const mobileAdvantagesRef = useRef(null);
  const workIndexRef = useRef(null);
  const workIndexActiveRef = useRef(0);

  function completeHeroIntro() {
    try {
      window.sessionStorage.setItem("portfolio-hero-intro-complete", "1");
    } catch {
      // Session storage can be unavailable in a private browser context.
    }
    setHeroIntroComplete(true);
  }

  const selectedExperience = portfolio.profile.timeline[activeExperience];
  const selectedExperienceImages = selectedExperience.images ?? [
    {
      src: portfolio.hero.poster,
      alt: `${selectedExperience.company}工作经历`,
      crop: "default",
    },
  ];
  const frontExperienceImageIndex =
    activeExperienceImage % selectedExperienceImages.length;
  const backExperienceImageIndex =
    (frontExperienceImageIndex + 1) % selectedExperienceImages.length;
  const displayedTagLines = isCompactViewport
    ? [...portfolio.tagLines, ...portfolio.tagLines]
    : portfolio.tagLines;

  const syncHeroForeground = () => {
    const background = heroVideoRef.current;
    const foreground = heroForegroundVideoRef.current;

    if (!background || !foreground) return;

    if (Math.abs(background.currentTime - foreground.currentTime) > 0.08) {
      foreground.currentTime = background.currentTime;
    }

    if (!background.paused && foreground.paused) {
      foreground.play().catch(() => {});
    }
  };

  useEffect(() => {
    const deferredImages = document.querySelectorAll('img[loading="lazy"]');

    deferredImages.forEach((image) => {
      image.decoding = "async";
      image.fetchPriority = "low";
    });
  }, []);

  useEffect(() => {
    const section = photographyRef.current;
    const sticky = photographyStickyRef.current;
    const leftRail = photographyLeftRef.current;
    const rightRail = photographyRightRef.current;
    const transition = photographyTransitionRef.current;
    const transitionFrames = transition?.querySelectorAll(
      ".photography-transition-frame",
    );
    if (
      !section ||
      !sticky ||
      !leftRail ||
      !rightRail ||
      !transition ||
      !transitionFrames?.length ||
      prefersReducedMotion
    ) {
      return undefined;
    }

    let animationFrame = 0;

    function updatePhotographyFlow() {
      animationFrame = 0;
      const rect = section.getBoundingClientRect();
      const travelWindow = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travelWindow));
      const viewportHeight = sticky.clientHeight;
      const leftTravel = Math.max(0, leftRail.scrollHeight - viewportHeight * 0.76);
      const rightTravel = Math.max(0, rightRail.scrollHeight - viewportHeight * 0.76);

      leftRail.style.transform = `translate3d(0, ${
        viewportHeight * 0.12 - progress * (leftTravel + viewportHeight * 0.2)
      }px, 0)`;
      rightRail.style.transform = `translate3d(0, ${
        -rightTravel - viewportHeight * 0.04 +
        progress * (rightTravel + viewportHeight * 0.2)
      }px, 0)`;

      const transitionRect = transition.getBoundingClientRect();
      const transitionProgress = Math.min(
        1,
        Math.max(
          0,
          (window.innerHeight - transitionRect.top) /
            (window.innerHeight + transitionRect.height),
        ),
      );
      const viewportWidth = window.innerWidth;

      transitionFrames.forEach((frame, index) => {
        const path = filmFlightPaths[index];
        const localProgress = Math.min(
          1,
          Math.max(0, (transitionProgress - path.delay) / (0.82 - path.delay)),
        );
        const easedProgress = 1 - Math.pow(1 - localProgress, 3);
        const x =
          (path.sx + (path.ex - path.sx) * easedProgress) * viewportWidth;
        const y =
          (path.sy + (path.ey - path.sy) * easedProgress) * viewportHeight;
        const rotation = path.sr + (path.er - path.sr) * easedProgress;
        const fadeOut =
          localProgress < 0.64
            ? 1
            : Math.max(0, 1 - (localProgress - 0.64) / 0.36);
        const fadeIn = Math.min(1, transitionProgress / 0.08);

        frame.style.opacity = String(fadeIn * fadeOut);
        frame.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) rotate(${rotation}deg) scale(${
          1 - easedProgress * 0.16
        })`;
      });
    }

    function requestPhotographyUpdate() {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updatePhotographyFlow);
      }
    }

    updatePhotographyFlow();
    window.addEventListener("scroll", requestPhotographyUpdate, { passive: true });
    window.addEventListener("resize", requestPhotographyUpdate);

    return () => {
      window.removeEventListener("scroll", requestPhotographyUpdate);
      window.removeEventListener("resize", requestPhotographyUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!screeningLightbox) return undefined;

    function closeOnEscape(event) {
      if (event.key === "Escape") setScreeningLightbox(null);
    }

    document.body.classList.add("video-lightbox-open");
    window.addEventListener("keydown", closeOnEscape);

    const lightboxVideo = lightboxVideoRef.current;
    const restartVideo = () => {
      lightboxVideo.currentTime = 0;
      lightboxVideo.play().catch(() => {});
    };

    lightboxVideo?.addEventListener("loadedmetadata", restartVideo, {
      once: true,
    });
    lightboxVideo?.load();

    return () => {
      document.body.classList.remove("video-lightbox-open");
      window.removeEventListener("keydown", closeOnEscape);
      lightboxVideo?.removeEventListener("loadedmetadata", restartVideo);
    };
  }, [screeningLightbox]);

  useEffect(() => {
    const viewport = window.matchMedia?.("(max-width: 820px)");
    if (!viewport) return undefined;

    const syncViewport = () => setIsCompactViewport(viewport.matches);
    syncViewport();
    viewport.addEventListener?.("change", syncViewport);

    return () => viewport.removeEventListener?.("change", syncViewport);
  }, []);

  useEffect(() => {
    if (!isCompactViewport || prefersReducedMotion) return undefined;

    const media = [...document.querySelectorAll(".experience-mobile-media")];
    const contactTitle = document.querySelector(".contact-giant");
    const contactLines = contactTitle
      ? [...contactTitle.querySelectorAll("span")]
      : [];
    let animationFrame = 0;

    media.forEach((item) => item.classList.add("is-scroll-scrubbed"));
    contactTitle?.classList.add("is-scroll-scrubbed");

    const update = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;

      media.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const progress = Math.min(
          1,
          Math.max(0, (viewportHeight * 0.9 - rect.top) / (viewportHeight * 0.5)),
        );
        item.style.setProperty("--reveal-opacity", `${progress}`);
        item.style.setProperty(
          "--reveal-x",
          `${Math.round((1 - progress) * Math.min(68, rect.width * 0.2))}px`,
        );
      });

      if (contactTitle) {
        const titleTop = contactTitle.getBoundingClientRect().top;
        const lineTravel = viewportHeight * 0.24;
        contactLines.forEach((line, index) => {
          const progress = Math.min(
            1,
            Math.max(0, (viewportHeight * 0.88 - (titleTop + index * 72)) / lineTravel),
          );
          line.style.setProperty("--contact-line-opacity", `${progress}`);
          line.style.setProperty("--contact-line-x", `${Math.round((progress - 1) * 72)}px`);
          line.style.setProperty(
            "--contact-line-scale",
            `${(0.82 + progress * 0.18).toFixed(3)}`,
          );
        });
      }
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isCompactViewport, prefersReducedMotion]);

  useEffect(() => {
    if (!isCompactViewport || prefersReducedMotion) return undefined;

    const section = workIndexRef.current;
    if (!section) return undefined;

    const rows = [...section.querySelectorAll("[data-mobile-work-index]")];
    let animationFrame = 0;
    let previousScrollY = window.scrollY;
    let hasMeasured = false;

    const updateActiveProject = () => {
      animationFrame = 0;
      const centerLine = window.innerHeight * 0.5;
      const triggerBand = 30;
      const scrollingDown = window.scrollY > previousScrollY;
      const scrollingUp = window.scrollY < previousScrollY;
      let nextProject = workIndexActiveRef.current;

      if (!hasMeasured) {
        rows.forEach((row, index) => {
          if (row.getBoundingClientRect().top <= centerLine) nextProject = index;
        });
        hasMeasured = true;
      } else if (scrollingDown) {
        while (
          nextProject < rows.length - 1 &&
          rows[nextProject + 1].getBoundingClientRect().top <= centerLine + triggerBand
        ) {
          nextProject += 1;
        }
      } else if (scrollingUp) {
        while (
          nextProject > 0 &&
          rows[nextProject].getBoundingClientRect().top >= centerLine - triggerBand
        ) {
          nextProject -= 1;
        }
      }

      previousScrollY = window.scrollY;
      if (nextProject !== workIndexActiveRef.current) {
        workIndexActiveRef.current = nextProject;
        setActiveProject(nextProject);
      }
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(updateActiveProject);
      }
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isCompactViewport, prefersReducedMotion]);

  useEffect(() => {
    if (!isCompactViewport || prefersReducedMotion) return undefined;

    const scene = mobileAdvantagesRef.current;
    if (!scene) return undefined;

    const backdrop = scene.querySelector(".mobile-advantages-backdrop");
    const sceneContent = scene.querySelector(".mobile-advantages-content");
    const nextSection = scene.nextElementSibling;
    const cards = [...scene.querySelectorAll(".mobile-advantage-card")];
    let animationFrame = 0;
    const clamp = (value, minimum = 0, maximum = 1) =>
      Math.min(maximum, Math.max(minimum, value));

    const updateScene = () => {
      animationFrame = 0;
      const rect = scene.getBoundingClientRect();
      const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / travel);
      const viewportHeight = window.innerHeight;
      backdrop?.style.setProperty(
        "--backdrop-x",
        `${Math.round(-viewportHeight * (0.06 + progress * 0.24))}px`,
      );
      const trackStart = 0.08;
      // Ten percent tighter than the prior 0.275 progress interval.
      const cardInterval = 0.2475;
      const rawTrackPosition = (progress - trackStart) / cardInterval;
      const lastCard = cards.at(-1);
      const lastCardCenter = lastCard
        ? lastCard.offsetTop + lastCard.offsetHeight / 2
        : viewportHeight * 0.5;
      // Begin moving the whole stage only when card 04's actual visual centre
      // reaches the viewport centre, regardless of browser viewport height.
      const stageExitStart = cards.length - 1 - (
        (viewportHeight * 0.5 - lastCardCenter) / (viewportHeight * 0.72)
      );
      const stageExitEnd = (1 - trackStart) / cardInterval;
      const stageExitProgress = clamp(
        (rawTrackPosition - stageExitStart) / (stageExitEnd - stageExitStart),
      );
      const trackPosition = clamp(rawTrackPosition, -0.58, stageExitStart);
      const stageExitY = -viewportHeight * 0.94 * stageExitProgress;

      backdrop?.style.setProperty("--backdrop-y", `${stageExitY.toFixed(1)}px`);
      sceneContent?.style.setProperty("--advantages-exit-y", `${stageExitY.toFixed(1)}px`);
      // Shift the following section in document flow (rather than with a visual
      // transform) so the fourth card can hand off smoothly without leaving a
      // viewport-sized gap before the experience section.
      if (nextSection) {
        const handoffStartProgress = clamp(
          trackStart + stageExitStart * cardInterval,
        );
        const handoffStart = Math.max(
          0,
          scene.offsetHeight - handoffStartProgress * travel - viewportHeight,
        );
        const handoffOffset = -(
          handoffStart + (viewportHeight - handoffStart) * stageExitProgress
        );
        nextSection.style.setProperty("margin-top", `${handoffOffset.toFixed(1)}px`);
      }
      cards.forEach((card, index) => {
        const relativePosition = index - trackPosition;
        const y = relativePosition * viewportHeight * 0.72;
        const opacity = Math.abs(relativePosition) < 1.18 ? 1 : 0;

        card.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
        card.style.opacity = `${opacity}`;
      });
    };
    const requestSceneUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateScene);
    };

    requestSceneUpdate();
    window.addEventListener("scroll", requestSceneUpdate, { passive: true });
    window.addEventListener("resize", requestSceneUpdate);
    return () => {
      window.removeEventListener("scroll", requestSceneUpdate);
      window.removeEventListener("resize", requestSceneUpdate);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      backdrop?.style.removeProperty("--backdrop-y");
      sceneContent?.style.removeProperty("--advantages-exit-y");
      nextSection?.style.removeProperty("margin-top");
    };
  }, [isCompactViewport, prefersReducedMotion]);

  useEffect(() => {
    if (!isCompactViewport || prefersReducedMotion) return undefined;

    const impact = document.querySelector(".mobile-photo-impact");
    const sticky = impact?.querySelector(".mobile-photo-impact-sticky");
    const frames = [...document.querySelectorAll(".mobile-photo-sequence-frame")];
    if (!impact || !sticky) return undefined;

    let animationFrame = 0;
    const clamp = (value, minimum = 0, maximum = 1) =>
      Math.min(maximum, Math.max(minimum, value));

    const update = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;
      const impactRect = impact.getBoundingClientRect();
      const travel = Math.max(1, impact.offsetHeight - viewportHeight);
      const progress = clamp(-impactRect.top / travel);

      sticky.style.setProperty("--mobile-photo-impact-scale", `${(1.035 - progress * 0.155).toFixed(3)}`);
      sticky.style.setProperty("--mobile-photo-impact-y", `${Math.round(-progress * 18)}px`);
      sticky.style.setProperty("--mobile-photo-title-y", `${Math.round(-progress * 54)}px`);
      sticky.style.setProperty("--mobile-photo-title-alpha", `${(1 - progress * 0.84).toFixed(3)}`);
      sticky.style.setProperty("--mobile-photo-data-alpha", `${clamp((progress - 0.19) / 0.36).toFixed(3)}`);
      sticky.style.setProperty("--mobile-photo-data-y", `${Math.round(18 - clamp((progress - 0.19) / 0.36) * 18)}px`);

      frames.forEach((frame, index) => {
        const rect = frame.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
        const focus = 1 - clamp(distance / (viewportHeight * 0.82));
        const direction = index % 2 ? 1 : -1;
        frame.style.setProperty("--mobile-frame-opacity", `${(0.42 + focus * 0.58).toFixed(3)}`);
        frame.style.setProperty("--mobile-frame-scale", `${(0.95 + focus * 0.05).toFixed(3)}`);
        frame.style.setProperty("--mobile-frame-x", `${Math.round(direction * (1 - focus) * 15)}px`);
      });
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isCompactViewport, prefersReducedMotion]);

  useEffect(() => {
    if (!isCompactViewport || !prefersReducedMotion) return;
    completeHeroIntro();
  }, [isCompactViewport, prefersReducedMotion]);

  useEffect(() => {
    if (heroIntroComplete || !isCompactViewport || prefersReducedMotion) {
      return undefined;
    }

    const introVideo = heroMobileIntroRef.current;
    if (!introVideo) return undefined;

    let hasStarted = false;
    let hasRevealed = false;
    let videoFrameCallback;
    let introFallbackTimer;

    const clearIntroFallback = () => {
      if (introFallbackTimer !== undefined) {
        window.clearTimeout(introFallbackTimer);
        introFallbackTimer = undefined;
      }
    };

    const revealWhenFirstFramePaints = () => {
      if (typeof introVideo.requestVideoFrameCallback === "function") {
        videoFrameCallback = introVideo.requestVideoFrameCallback(() => {
          clearIntroFallback();
          hasRevealed = true;
          setHeroIntroVideoReady(true);
        });
        return;
      }
      clearIntroFallback();
      hasRevealed = true;
      setHeroIntroVideoReady(true);
    };

    const startIntro = () => {
      if (hasStarted) return;
      hasStarted = true;
      introVideo.muted = true;
      introVideo.defaultMuted = true;
      introVideo.playsInline = true;
      introVideo.play().then(revealWhenFirstFramePaints).catch(completeHeroIntro);
    };

    // In-app browsers can wait for play() before they fetch inline media, so
    // request it immediately and retain the media events as safe retries.
    introVideo.addEventListener("loadeddata", startIntro);
    introVideo.addEventListener("canplay", startIntro);
    introVideo.addEventListener("playing", revealWhenFirstFramePaints, { once: true });
    startIntro();
    introFallbackTimer = window.setTimeout(() => {
      if (!hasRevealed) {
        completeHeroIntro();
      }
    }, 2400);

    return () => {
      clearIntroFallback();
      introVideo.removeEventListener("loadeddata", startIntro);
      introVideo.removeEventListener("canplay", startIntro);
      introVideo.removeEventListener("playing", revealWhenFirstFramePaints);
      if (
        videoFrameCallback !== undefined &&
        typeof introVideo.cancelVideoFrameCallback === "function"
      ) {
        introVideo.cancelVideoFrameCallback(videoFrameCallback);
      }
    };
  }, [heroIntroComplete, isCompactViewport, prefersReducedMotion]);

  function selectProject(project) {
    const nextIndex = portfolio.projects.findIndex(
      (candidate) => candidate.title === project.title,
    );
    if (nextIndex >= 0) setActiveProject(nextIndex);
  }

  function updatePointerFloat(event, maxTilt = 5, travel = 5) {
    if (prefersReducedMotion) return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const horizontal = (event.clientX - rect.left) / rect.width - 0.5;
    const vertical = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty("--tilt-x", `${vertical * -maxTilt * 2}deg`);
    element.style.setProperty("--tilt-y", `${horizontal * maxTilt * 2}deg`);
    element.style.setProperty("--float-x", `${horizontal * travel * 2}px`);
    element.style.setProperty("--float-y", `${vertical * travel * 2}px`);
    element.style.setProperty("--glint-x", `${(horizontal + 0.5) * 100}%`);
    element.style.setProperty("--glint-y", `${(vertical + 0.5) * 100}%`);
  }

  function resetPointerFloat(event) {
    const element = event.currentTarget;
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
    element.style.setProperty("--float-x", "0px");
    element.style.setProperty("--float-y", "0px");
  }

  function playScreeningVideo(item) {
    const shouldUseLightbox =
      window.matchMedia?.("(max-width: 820px)")?.matches ?? isCompactViewport;

    if (shouldUseLightbox) {
      setActiveScreening(null);
      setScreeningLightbox(item);
      return;
    }

    setActiveScreening((current) => (current === item.id ? null : item.id));
  }

  return (
    <div className={`site${usesWebKitVideoFallback ? " site-webkit" : ""}`}>
      <header
        className={`hero${heroIntroComplete ? " hero-intro-complete" : ""}${heroIntroVideoReady ? " hero-intro-video-ready" : ""}`}
        id="top"
        data-testid="hero"
        data-hero-mode="loop"
      >
        <img
          className="hero-mobile-poster"
          src={assetPath("assets/optimized/opening3.jpg")}
          alt=""
          aria-hidden="true"
        />
        <video
          ref={heroMobileIntroRef}
          className="hero-mobile-intro"
          src={assetPath("assets/opening3-mobile.mp4")}
          autoPlay={!prefersReducedMotion}
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
          aria-label="唐梦龙作品集开场影像"
          onEnded={completeHeroIntro}
          onError={completeHeroIntro}
        />
        {!isCompactViewport && (
          <>
            <img
              className="hero-poster"
              src={portfolio.hero.poster}
              alt="唐梦龙手持稳定器拍摄"
              data-testid="hero-poster"
            />

            <video
              ref={heroVideoRef}
              className="hero-video"
              src={portfolio.hero.video}
              poster={portfolio.hero.poster}
              autoPlay={!prefersReducedMotion}
              loop
              muted
              playsInline
              preload="auto"
              data-testid="hero-loop-video"
              aria-label="唐梦龙手持稳定器的循环影像"
              onPlaying={syncHeroForeground}
              onSeeked={syncHeroForeground}
              onTimeUpdate={syncHeroForeground}
            />

            <video
              ref={heroForegroundVideoRef}
              className="hero-foreground"
              src={assetPath("assets/hero-loop-foreground.webm")}
              autoPlay={!prefersReducedMotion}
              loop
              muted
              playsInline
              preload="auto"
              data-testid="hero-foreground-video"
              aria-hidden="true"
            />

            <img
              className="hero-foreground-fallback"
              src={assetPath("assets/hero-loop-foreground-fallback.png")}
              alt=""
              aria-hidden="true"
            />
          </>
        )}

        <h1 className="visually-hidden">
          {portfolio.name}，{portfolio.role}
        </h1>

        <div className="hero-type" data-testid="hero-type" aria-hidden="true">
          <p className="hero-word hero-word-bruce">BRUCE</p>
          <p className="hero-word hero-word-tang">TANG</p>
          <p className="hero-chinese">
            唐梦龙
            <span>AI 影像创意导演</span>
          </p>
          <p className="hero-director">
            AI MOVING IMAGE
            <span>CREATIVE DIRECTOR</span>
          </p>
        </div>

        <nav className="topbar" aria-label="主导航">
          <div className={`nav-links${menuOpen ? " nav-links-open" : ""}`}>
            {portfolio.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            className="hero-screening-jump"
            href="#screening"
            onClick={() => setMenuOpen(false)}
          >
            观看作品集视频，可直接跳转 <span aria-hidden="true">→</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "关闭导航" : "打开导航"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </nav>

        <a className="hero-scroll-cue" href="#tags" aria-label="向下浏览个人优势">
          <ChevronDown aria-hidden="true" />
        </a>
      </header>

      <main>
        {isCompactViewport ? (
          <section className="mobile-advantages" id="tags" aria-label="个人优势" ref={mobileAdvantagesRef}>
            <div className="mobile-advantages-sticky">
              <div className="mobile-advantages-backdrop" aria-hidden="true">
                {Array.from({ length: 16 }, (_, index) => (
                  <span key={index}>
                    STRENGTHS&nbsp;&nbsp;STRENGTHS&nbsp;&nbsp;STRENGTHS&nbsp;&nbsp;STRENGTHS&nbsp;&nbsp;STRENGTHS&nbsp;&nbsp;STRENGTHS
                  </span>
                ))}
              </div>
              <div className="mobile-advantages-content">
                <div className="mobile-advantages-title-banner">
                  <p className="mobile-advantages-kicker">01 / PERSONAL STRENGTHS</p>
                  <h2 id="tags-title">个人优势</h2>
                </div>
                <div className="mobile-advantages-list">
                  {mobileAdvantages.map((advantage) => (
                    <article
                      className="mobile-advantage-card"
                      data-advantage={advantage.id}
                      key={advantage.label}
                    >
                      <AdvantageCardArt advantage={advantage} />
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="tag-section" id="tags" aria-labelledby="tags-title">
            <div className="section-shell tag-shell">
              <h2 id="tags-title">个人标签</h2>
              <div className="tag-stage" aria-label="创作能力关键词">
                {displayedTagLines.map((line, rowIndex) => (
                  <div
                    className={`tag-line tag-line-${(rowIndex % portfolio.tagLines.length) + 1}`}
                    key={`${line.join("-")}-${rowIndex}`}
                  >
                    {line.map((tag, columnIndex) => (
                      <span
                        className={`tag-word tag-word-${rowIndex}-${columnIndex}`}
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="tag-progress" aria-hidden="true">
                <span />
                <i />
              </div>
              <SectionMarker index="01" label="SIGNALS" />
            </div>
          </section>
        )}

        <section
          className="profile-section"
          id="profile"
          aria-labelledby="profile-title"
        >
          <span className="profile-ghost" aria-hidden="true">
            PROFILE
          </span>
          <div className="section-shell profile-shell">
            <MobilePageHeader title="个人简介" index="02" label="PROFILE" />
            <div className="profile-visuals">
              <figure className="profile-work-photo">
                <img
                  src={portfolio.profile.workPortrait}
                  alt="唐梦龙手持稳定器进行现场拍摄"
                  loading="lazy"
                />
              </figure>
              <figure
                className="profile-headshot pointer-float"
                onPointerMove={(event) => updatePointerFloat(event, 4, 5)}
                onPointerLeave={resetPointerFloat}
              >
                <img
                  src={portfolio.profile.headshot}
                  alt="唐梦龙白底肖像"
                  loading="lazy"
                />
              </figure>
              <span className="profile-visual-index" aria-hidden="true">
                PORTRAIT / ON SET
              </span>
            </div>

            <div className="profile-copy">
              <SectionMarker index="02" label="PROFILE" />
              <div className="profile-label">
                <i aria-hidden="true" />
                <h2 id="profile-title">个人简介</h2>
              </div>
              <h3>{portfolio.name}</h3>
              <p className="profile-role">{portfolio.role}</p>
              <p className="profile-summary">{portfolio.profile.summary}</p>

              <div className="profile-metrics" aria-label="履历数据">
                {portfolio.metrics.map((metric) => (
                  <div className="profile-metric" key={metric.label}>
                    <strong>
                      {metric.value}
                      <small>{metric.suffix}</small>
                    </strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="experience-section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="section-shell experience-shell">
            <MobilePageHeader title="个人经历" index="02" label="EXPERIENCE" light />
            <div className="experience-header">
              <h2 id="experience-title">个人经历</h2>
              <SectionMarker index="02" label="EXPERIENCE" light />
            </div>

            <div className="experience-stage" data-testid="experience-stage">
              <div className="experience-copy" key={selectedExperience.company}>
                <p className="experience-period">{selectedExperience.period}</p>
                <h3>{selectedExperience.company}</h3>
                <h4>{selectedExperience.title}</h4>
                <p className="experience-detail">{selectedExperience.detail}</p>
              </div>

              <figure
                  className={`experience-photo pointer-float${
                    selectedExperienceImages.length > 1
                      ? " experience-photo-gallery"
                      : ""
                  }${
                    selectedExperience.company === "36氪"
                      ? " experience-photo-36kr"
                      : ""
                  }`}
                onPointerMove={(event) => updatePointerFloat(event, 3.2, 5)}
                onPointerLeave={resetPointerFloat}
              >
                {selectedExperienceImages.length > 1 && (
                  <img
                    className={`experience-image experience-image-back experience-image-${selectedExperienceImages[backExperienceImageIndex].crop}`}
                    src={selectedExperienceImages[backExperienceImageIndex].src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                )}
                <img
                  className={`experience-image experience-image-front experience-image-${selectedExperienceImages[frontExperienceImageIndex].crop}`}
                  key={selectedExperienceImages[frontExperienceImageIndex].src}
                  src={selectedExperienceImages[frontExperienceImageIndex].src}
                  alt={selectedExperienceImages[frontExperienceImageIndex].alt}
                  loading="lazy"
                />

                {selectedExperienceImages.length > 1 && (
                  <div className="experience-gallery-controls">
                    <button
                      type="button"
        aria-label="查看上一张项目图片"
                      title="上一张"
                      onClick={() =>
                        setActiveExperienceImage((current) =>
                          (current - 1 + selectedExperienceImages.length) %
                          selectedExperienceImages.length
                        )
                      }
                    >
                      <ArrowLeft aria-hidden="true" />
                    </button>
                    <span aria-live="polite">
                      {String(frontExperienceImageIndex + 1).padStart(2, "0")} /{" "}
                      {String(selectedExperienceImages.length).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
        aria-label="查看下一张项目图片"
                      title="下一张"
                      onClick={() =>
                        setActiveExperienceImage((current) =>
                          (current + 1) % selectedExperienceImages.length
                        )
                      }
                    >
                      <ArrowRight aria-hidden="true" />
                    </button>
                  </div>
                )}
              </figure>
            </div>

            <div className="timeline" aria-label="工作经历时间线">
              {portfolio.profile.timeline.map((item, index) => (
                <button
                  className={`timeline-item${
                    activeExperience === index ? " timeline-item-active" : ""
                  }`}
                  type="button"
                  key={`${item.period}-${item.company}`}
                  aria-pressed={activeExperience === index}
                  onPointerEnter={() => {
                    setActiveExperience(index);
                    setActiveExperienceImage(0);
                  }}
                  onFocus={() => {
                    setActiveExperience(index);
                    setActiveExperienceImage(0);
                  }}
                  onClick={() => {
                    setActiveExperience(index);
                    setActiveExperienceImage(0);
                  }}
                >
                  <i aria-hidden="true" />
                  <span>{item.period}</span>
                  <strong>{item.shortCompany}</strong>
                </button>
              ))}
            </div>

            <div className="experience-mobile" aria-label="纵向工作经历">
              {portfolio.profile.timeline.map((item) => {
                const images = item.mobileImages ?? item.images ?? [
                  {
                    src: portfolio.hero.poster,
                    alt: `${item.company}工作经历`,
                    crop: "default",
                  },
                ];

                return (
                  <article
                    className="experience-mobile-item"
                    key={`mobile-${item.period}-${item.company}`}
                  >
                    <i className="experience-mobile-dot" aria-hidden="true" />
                    <p className="experience-mobile-period">
                      {item.mobilePeriod ?? item.period}
                    </p>
                    <h3>{item.company}</h3>
                    <h4>{item.title}</h4>
                    <p className="experience-mobile-detail">
                      {item.mobileDetail ?? item.detail}
                    </p>
                    <div
                      className={`experience-mobile-media${
                        images.length > 1 ? " experience-mobile-media-stack" : ""
                      }${
                        item.company === "36氪"
                          ? " experience-mobile-media-36kr"
                          : ""
                      }${
                        item.company === "新东方-欧亚教育"
                          ? " experience-mobile-media-xdf"
                          : ""
                      }`}
                    >
                      {images.slice(0, 2).map((image, imageIndex) => (
                        <figure key={`${item.company}-${image.src}`}>
                          <img
                            className={`experience-image-${image.crop ?? "default"}`}
                            src={image.src}
                            alt={imageIndex === 0 ? image.alt : ""}
                            aria-hidden={imageIndex > 0 ? "true" : undefined}
                            loading="lazy"
                          />
                        </figure>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          ref={workIndexRef}
          className="work-index-section"
          id="work-index"
          aria-labelledby="work-index-title"
          data-testid="work-index"
        >
          <span className="work-ghost" aria-hidden="true">
            WORK
          </span>
          <div className="section-shell work-index-shell">
            <MobilePageHeader title="项目索引" index="03" label="WORK INDEX" />
            <div className="work-index-header">
              <h2 id="work-index-title">项目索引</h2>
            </div>

            {!isCompactViewport ? (
            <div className="work-list">
              {portfolio.projects.map((project) => {
                const projectIndex = portfolio.projects.findIndex(
                  (candidate) => candidate.title === project.title,
                );
                const isSelected = activeProject === projectIndex;

                return (
                  <button
                    className={`work-row${isSelected ? " work-row-active" : ""}`}
                    type="button"
                    key={project.title}
                    aria-pressed={isSelected}
                    onPointerEnter={() => selectProject(project)}
                    onFocus={() => selectProject(project)}
                    onPointerMove={(event) => updatePointerFloat(event, 0, 5)}
                    onPointerLeave={resetPointerFloat}
                    onClick={() => selectProject(project)}
                  >
                    <span className="work-number">
                      {String(projectIndex + 1).padStart(2, "0")}
                    </span>
                    <strong>{project.title}</strong>
                    <span className="work-meta">{project.type}</span>
                    {isSelected ? (
                      <span className="work-preview" aria-hidden="true">
                        <i />
                        <img src={project.image} alt="" loading="lazy" />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            ) : (
            <div className="work-list-mobile" aria-label="项目索引">
              {portfolio.projects.map((project, projectIndex) => {
                const isSelected = activeProject === projectIndex;

                return (
                  <article
                    className={`work-mobile-item${
                      isSelected ? " work-mobile-item-open" : ""
                    }`}
                    key={`mobile-${project.title}`}
                    data-mobile-work-index={projectIndex}
                  >
                    <button
                      type="button"
                      aria-expanded={isSelected}
                      aria-controls={`work-mobile-preview-${projectIndex}`}
                      onClick={() =>
                        setActiveProject(() => {
                          const nextProject =
                            workIndexActiveRef.current === projectIndex
                              ? -1
                              : projectIndex;
                          workIndexActiveRef.current = nextProject;
                          return nextProject;
                        })
                      }
                    >
                      <span>{String(projectIndex + 1).padStart(2, "0")}</span>
                      <strong>{project.title}</strong>
                      <ArrowRight aria-hidden="true" />
                    </button>
                    <div
                      className="work-mobile-panel"
                      id={`work-mobile-preview-${projectIndex}`}
                    >
                      <div>
                        <figure>
                          <img src={project.image} alt="" loading="lazy" />
                        </figure>
                        <p>{project.type}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            )}

            <SectionMarker index="03" label="WORK INDEX" />
          </div>
        </section>

        <section
          className="screening-section"
          id="screening"
          aria-labelledby="screening-title"
          data-testid="screening"
        >
          <span className="screening-ghost" aria-hidden="true">
            AI CREATIVE
          </span>
          <div className="section-shell screening-shell">
            <MobilePageHeader title="作品集放映" index="04" label="SCREENING" light />
            <div className="screening-header">
              <h2 id="screening-title">作品集放映</h2>
            </div>

            <div className="screening-grid">
              {portfolio.screening.map((item, index) => {
                const isActive = activeScreening === item.id;

                return (
                  <article
                    className={`screening-card screening-card-${item.size}${
                      isActive ? " screening-card-active" : ""
                    }`}
                    key={item.id}
                    data-testid={`screening-card-${item.id}`}
                  >
                    <div className="screening-frame">
                      {isActive ? (
                        <video
                          src={item.src}
                          poster={item.poster}
                          preload="auto"
                          autoPlay
                          playsInline
                          controls
                          data-testid={`screening-video-${item.id}`}
                          onEnded={() => setActiveScreening(null)}
                        />
                      ) : (
                        <img
                          src={item.poster}
                          alt={`${item.title} 封面`}
                          loading="lazy"
                          decoding="async"
                          fetchpriority="low"
                        />
                      )}
                      {!isActive && (
                        <button
                          className="screening-play"
                          type="button"
                          aria-label={`播放 ${item.title}`}
                          title={`播放 ${item.title}`}
                          onClick={() => playScreeningVideo(item)}
                        >
                          <Play aria-hidden="true" fill="currentColor" />
                        </button>
                      )}
                    </div>

                    <div className="screening-meta">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.credit}</p>
                      </div>
                      <small>{item.ratio}</small>
                    </div>
                  </article>
                );
              })}
              <span className="screening-axis" aria-hidden="true" />
            </div>

            <SectionMarker index="04" label="SCREENING" light />
          </div>
        </section>

        <section
          className="mobile-photo-impact"
          id="unsplash-impact"
          aria-labelledby="mobile-photo-impact-title"
        >
          <div className="mobile-photo-impact-sticky">
            <MobilePageHeader title="代表作" index="05" label="PHOTOGRAPHIC IMPACT" light />
            <figure className="mobile-photo-impact-media">
              <img src={portfolio.unsplashImpact.image} alt={portfolio.unsplashImpact.alt} loading="lazy" />
            </figure>
            <div className="mobile-photo-impact-data" aria-label="摄影作品传播数据">
              {portfolio.unsplashImpact.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}{metric.suffix}</strong>
                  <span>{metric.english}</span>
                </div>
              ))}
            </div>
            <p className="mobile-photo-impact-caption">个人在Unsplash.com中数据最高的照片，获得1200万浏览量，12万下载</p>
            <h2 id="mobile-photo-impact-title" className="mobile-photo-impact-title">
              ONE<br />FRAME
              <small>一张照片，被世界看见。</small>
            </h2>
          </div>
        </section>

        <section className="mobile-photo-relay" aria-label="摄影作品章节过渡">
          <div className="mobile-photo-relay-copy">
            <p>05 → 06 / THE RELAY</p>
            <h2>从一张，到一组。</h2>
            <span>坚持摄影13年。</span>
          </div>
          <div className="mobile-photo-relay-stage" aria-hidden="true">
            <figure className="mobile-photo-relay-main"><img src={portfolio.unsplashImpact.image} alt="" loading="lazy" /></figure>
            <figure className="mobile-photo-relay-red"><img src={assetPath("assets/optimized/photo-red-wall.jpg")} alt="" loading="lazy" /></figure>
            <figure className="mobile-photo-relay-alley"><img src={assetPath("assets/optimized/photo-concrete-alley.jpg")} alt="" loading="lazy" /></figure>
            <b>06</b>
          </div>
        </section>

        <section className="mobile-photo-sequence" id="photography" aria-labelledby="mobile-photography-title">
          <MobilePageHeader title="摄影作品" index="06" label="SELECTED FRAMES" />
          <p className="mobile-photo-sequence-intro">无人在意的角落，在独特的角度下，也有属于它的美。以小见大，与光影为伴。</p>
          <div className="mobile-photo-sequence-list">
            {photographyFrames.map((photo, index) => (
              <figure
                className={`mobile-photo-sequence-frame mobile-photo-sequence-frame--${mobilePhotographyFrameLayouts[index]}`}
                key={`mobile-${photo.src}`}
              >
                <div className="mobile-photo-sequence-frame-media">
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </div>
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")} / {photo.alt}</span>
                  <span>BRUCE TANG</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mobile-photo-sequence-closing" aria-hidden="true">
            <strong>FRAME<br />BY FRAME</strong><span>BRUCE TANG<br />PHOTOGRAPHY</span>
          </div>
        </section>

        <section
          className="impact-section"
          id="unsplash-impact-desktop"
          aria-labelledby="impact-title"
          data-testid="unsplash-impact"
        >
          <span className="impact-ghost" aria-hidden="true">
            UNSPLASH
          </span>
          <div className="section-shell impact-shell">
            <MobilePageHeader title="摄影作品" index="05" label="PHOTOGRAPHY" light />
            <header className="impact-header">
              <SectionMarker index="05" label="摄影作品" light separator={false} />
            </header>

            <div className="impact-layout">
              <div className="impact-intro">
                <p>BRUCE TANG / PHOTOGRAPHY</p>
                <h2
                  id="impact-title"
                  aria-label={portfolio.unsplashImpact.title.replace("\n", "")}
                >
                  {portfolio.unsplashImpact.title.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
                <p>{portfolio.unsplashImpact.description}</p>
              </div>

              <figure
                className="impact-figure pointer-float"
                onPointerMove={(event) => updatePointerFloat(event, 3.8, 7)}
                onPointerLeave={resetPointerFloat}
              >
                <img
                  src={portfolio.unsplashImpact.image}
                  alt={portfolio.unsplashImpact.alt}
                  loading="lazy"
                />
                <span className="impact-glint" aria-hidden="true" />
                <figcaption>
                  <span>SELECTED FRAME</span>
                  <span>01 / 01</span>
                </figcaption>
              </figure>

              <div className="impact-metrics" aria-label="Unsplash 作品传播数据">
                {portfolio.unsplashImpact.metrics.map((metric) => (
                  <div className="impact-metric" key={metric.label}>
                    <p>{metric.english}</p>
                    <strong>
                      {metric.value}
                      <small>{metric.suffix}</small>
                    </strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="impact-footnote">
              PUBLIC IMAGE / ORGANIC REACH / VISUAL AUTHORSHIP
            </p>
          </div>
        </section>

        <div
          className="photography-transition"
          aria-hidden="true"
          data-testid="photography-transition"
          ref={photographyTransitionRef}
        >
          <div className="photography-transition-stage">
            {photographyFrames.slice(0, filmFlightPaths.length).map((photo, index) => (
              <figure
                className="photography-transition-frame"
                key={`transition-${photo.src}`}
                style={{ "--frame-index": index }}
              >
                <img src={photo.src} alt="" loading="lazy" />
              </figure>
            ))}
          </div>
        </div>

        <section
          className="photography-section"
          id="photography-desktop"
          aria-labelledby="photography-title"
          data-testid="photography"
          ref={photographyRef}
        >
          <div className="photography-sticky" ref={photographyStickyRef}>
            <MobilePageHeader title={portfolio.photography.title} index="06" label="PHOTOGRAPHY" light />
            <div className="photography-heading">
              <h2 id="photography-title">{portfolio.photography.title}</h2>
              <p>{portfolio.photography.subtitle}</p>
            </div>

            <div
              className="photography-rail photography-rail-left"
              ref={photographyLeftRef}
            >
              {portfolio.photography.leftRail.map((photo, index) => (
                <figure
                  className={`photo-frame photo-frame-${photo.shape} pointer-float`}
                  key={photo.src}
                  onPointerMove={(event) => updatePointerFloat(event, 2.4, 5)}
                  onPointerLeave={resetPointerFloat}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
                </figure>
              ))}
            </div>

            <div
              className="photography-rail photography-rail-right"
              ref={photographyRightRef}
            >
              {portfolio.photography.rightRail.map((photo, index) => (
                <figure
                  className={`photo-frame photo-frame-${photo.shape} pointer-float`}
                  key={photo.src}
                  onPointerMove={(event) => updatePointerFloat(event, 2.4, 5)}
                  onPointerLeave={resetPointerFloat}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption>
                    {String(index + portfolio.photography.leftRail.length + 1).padStart(
                      2,
                      "0",
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="photography-center" aria-hidden="true">
              <span>OBSERVE</span>
              <i />
              <span>14 FRAMES</span>
            </div>

            <div className="section-shell photography-marker">
              <SectionMarker index="06" label="PHOTOGRAPHY" light />
            </div>
          </div>
        </section>

        <section
          className="ai-builds-section"
          id="ai-builds"
          aria-labelledby="ai-builds-title"
          data-testid="ai-builds"
        >
          <div className="ai-builds-intro">
            <span className="ai-builds-ghost" aria-hidden="true">
              MADE REAL
            </span>
            <div className="section-shell ai-builds-intro-shell">
              <MobilePageHeader title="AI 共创" index="07" label="AI-BUILT OUTCOMES" light />
              <div className="ai-builds-heading">
                <p>AI CO-CREATION / 2026</p>
                <h2 id="ai-builds-title" aria-label="AI 共创成果">
                  我用AI<br />
                  <span>把想法做成了实际成果</span>
                </h2>
                <p className="ai-builds-lede">
                  以下三个项目不是概念图。由我主导创意方向、视觉判断、内容结构与最终验收，
                  并与 AI 协作完成设计、开发和持续迭代。
                </p>
              </div>
              <div className="ai-builds-collaboration" aria-label="人机协作分工">
                <div>
                  <span>我负责</span>
                  <p>方向定义 / 视觉决策 / 内容组织 / 质量验收</p>
                </div>
                <div>
                  <span>AI 协作</span>
                  <p>代码实现 / 自动化处理 / 拟定前端设计方案 / 版本迭代</p>
                </div>
              </div>
              <SectionMarker index="07" label="AI-BUILT OUTCOMES" light />
            </div>
          </div>

          <div className="section-shell ai-builds-shell">
            <div className="ai-builds-grid">
              {portfolio.aiBuilds.map((item) => (
                <article className={`ai-build ai-build-${item.index}`} key={item.title}>
                  <div className="ai-build-heading">
                    <span>{item.index}</span>
                    <p>{item.category} / {item.year}</p>
                  </div>
                  <div className="ai-build-visuals">
                    {item.images.map((image, imageIndex) => (
                      <figure
                        className={`ai-build-visual ai-build-visual-${
                          imageIndex === 0 ? "main" : "detail"
                        }`}
                        key={image.src}
                      >
                        <img src={image.src} alt={image.alt} loading="lazy" />
                      </figure>
                    ))}
                  </div>
                  <div className="ai-build-copy">
                    <p className="ai-build-kicker">AI-BUILT / WORKING OUTCOME</p>
                    <h3>{item.title}</h3>
                    <p className="ai-build-description">{item.description}</p>
                    <ul aria-label={`${item.title} 交付要点`}>
                      {item.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        className="contact-section"
        id="contact"
        style={{ "--contact-background": `url("${assetPath("assets/optimized/hero-locked-4k.jpg")}")` }}
      >
        <div className="section-shell contact-shell">
          <MobilePageHeader title="联系合作" index="08" label="CONTACT" light />
          <h2>联系合作</h2>
          <p className="contact-giant" aria-hidden="true">
            <span>LET&apos;S MAKE</span>
            <span>THE NEXT</span>
            <span>FRAME</span>
          </p>

          <div className="contact-bottom">
            <p className="contact-invitation">一起创造未来</p>
            <address>
              <a
                href={`mailto:${portfolio.contact.email}`}
                aria-label={`发送邮件到 ${portfolio.contact.email}`}
              >
                {portfolio.contact.email}
              </a>
              <a href={`tel:${portfolio.contact.phone}`}>
                {portfolio.contact.phone}（微信同号）
              </a>
              <span>{portfolio.contact.city}</span>
              <a
                className="contact-arrow"
                href={`mailto:${portfolio.contact.email}`}
                aria-label="联系唐梦龙"
              >
                <ArrowRight aria-hidden="true" />
              </a>
            </address>
          </div>

          <SectionMarker index="08" label="CONTACT" light />
        </div>
      </footer>

      {screeningLightbox ? (
        <div
          className="screening-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`播放 ${screeningLightbox.title}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setScreeningLightbox(null);
          }}
        >
          <button
            className="screening-lightbox-close"
            type="button"
            aria-label="退出视频播放"
            title="退出播放"
            onClick={() => setScreeningLightbox(null)}
          >
            <X aria-hidden="true" />
          </button>
          <div
            className="screening-lightbox-stage"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              ref={lightboxVideoRef}
              src={screeningLightbox.src}
              poster={screeningLightbox.poster}
              autoPlay
              controls
              playsInline
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
