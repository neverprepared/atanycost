/* ============================================================
   AT ANY COST: interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- reveal-on-scroll ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- "hours converted to margin" counter ----
     A deliberately unsettling running meter. We assume a wage
     absurdity: your time accrues to someone else at a rate you
     never agreed to. Rate is arbitrary/theatrical, not literal. */
  const counterEl = document.getElementById("counterValue");
  if (counterEl) {
    const start = Date.now();
    // 1 "converted hour" per 4 real seconds, fast enough to feel wrong.
    const RATE = 1 / 4;
    const tick = () => {
      const elapsedSec = (Date.now() - start) / 1000;
      const value = elapsedSec * RATE;
      counterEl.textContent = value.toFixed(2);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---- winners' circle: rotating back-patting brags ---- */
  const bragEl = document.getElementById("brag");
  const bragAttrEl = document.getElementById("bragAttr");
  const BRAGS = [
    {
      q: "“I succeeded because they didn't. That's not luck. That's leadership.”",
      a: "Chairman Emeritus, a holding company of holding companies",
    },
    {
      q: "“We don't beat the competition. We <em>befriend</em> it, then acquire it, then discontinue it.”",
      a: "Chief Synergy Officer, formerly four separate companies",
    },
    {
      q: "“If everyone could do it, it wouldn't be special. So we made sure not everyone can.”",
      a: "Founder, self-made (terms and conditions apply)",
    },
    {
      q: "“The free market is sacred, which is why I've spent so much protecting it from other people entering it.”",
      a: "Keynote speaker, The Job Creators' Gala",
    },
    {
      q: "“He took a huge risk with everyone else's money, and it paid off for him. A true visionary.”",
      a: "The other guy, who is next up to be applauded",
    },
    {
      q: "“We reward hard work. Ours. Loudly. At a dinner you're catering.”",
      a: "Recipient, Lifetime Achievement in Extraction",
    },
  ];
  if (bragEl && bragAttrEl) {
    let bi = 0;
    const rotate = () => {
      bragEl.style.opacity = "0";
      bragAttrEl.style.opacity = "0";
      window.setTimeout(() => {
        bi = (bi + 1) % BRAGS.length;
        bragEl.innerHTML = BRAGS[bi].q;
        bragAttrEl.textContent = BRAGS[bi].a;
        bragEl.style.opacity = "1";
        bragAttrEl.style.opacity = "1";
      }, 450);
    };
    window.setInterval(rotate, 4200);
  }

  /* ---- market share: consolidation, triggered on scroll into view ---- */
  const marketSection = document.getElementById("market");
  const marketFoot = document.getElementById("marketFoot");
  const rivals = ["seg1", "seg2", "seg3", "seg4"].map((id) =>
    document.getElementById(id)
  );
  const segUs = document.getElementById("segUs");
  const FOOTS = [
    "Consolidating...",
    "Acquiring “synergies”...",
    "Welcoming them to the family...",
    "Streamlining redundancies...",
    "Achieving operational efficiency...",
    "100% market share. Thank you for your business. You have no other option.",
  ];
  if (marketSection && segUs && rivals.every(Boolean)) {
    let consumed = false;
    const devour = () => {
      if (consumed) return;
      consumed = true;
      rivals.forEach((seg, i) => {
        window.setTimeout(() => {
          seg.classList.add("is-eaten");
          segUs.style.flexGrow = String(2 + (i + 1) * 3);
          if (marketFoot) marketFoot.textContent = FOOTS[i + 1] || FOOTS[0];
        }, 900 + i * 1300);
      });
      window.setTimeout(() => {
        if (segUs.querySelector("span")) {
          segUs.querySelector("span").textContent = "US (AND ONLY US)";
        }
        if (marketFoot) marketFoot.textContent = FOOTS[FOOTS.length - 1];
      }, 900 + rivals.length * 1300);
    };

    if ("IntersectionObserver" in window) {
      const mo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              devour();
              mo.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      mo.observe(marketSection);
    } else {
      devour();
    }
  }

  /* ---- comfort ceiling: a security meter that never gets to fill ---- */
  const comfortSection = document.getElementById("comfort");
  const comfortFill = document.getElementById("comfortFill");
  const comfortPct = document.getElementById("comfortPct");
  const comfortEvent = document.getElementById("comfortEvent");
  const comfortTrack = comfortSection
    ? comfortSection.querySelector(".comfort__track")
    : null;
  if (comfortSection && comfortFill && comfortPct && comfortTrack) {
    const EVENTS = [
      "SURPRISE REORG. Your team now reports to someone named Chad.",
      "STACK RANKING SEASON. Someone has to be the bottom 10%. Statistically, maybe you.",
      "\"Quick chat?\" just appeared on your calendar. No agenda. No details. No.",
      "MARKET HEADWINDS. We're tightening our belt. It's your belt.",
      "A consultant is reviewing efficiencies. You are an efficiency.",
      "RETURN-TO-OFFICE MANDATE, effective a date engineered to ruin your life.",
      "\"We're a family.\" Cue the part of family nobody talks about.",
      "Your role is being right-sized to align with strategic priorities.",
      "HIRING FREEZE. Same work, fewer of you. Do more with less, again.",
      "New VP wants to \"make their mark.\" You are on the surface being marked.",
    ];
    const CALM = "Building slowly. Almost feels safe.";

    let value = 0;
    let running = false;
    let nextHitAt = 0;
    let evIndex = 0;

    const knockDown = () => {
      const idx = evIndex % EVENTS.length;
      evIndex += 1;
      value = 4 + Math.random() * 14; // reset to a low, anxious baseline
      comfortTrack.classList.add("is-hit");
      comfortEvent.textContent = EVENTS[idx];
      comfortEvent.classList.add("is-alarm");
      window.setTimeout(() => {
        comfortTrack.classList.remove("is-hit");
      }, 400);
      window.setTimeout(() => {
        comfortEvent.textContent = CALM;
        comfortEvent.classList.remove("is-alarm");
      }, 2600);
      // schedule the next interruption 3.5–7s out, so it never truly settles
      nextHitAt = Date.now() + 3500 + Math.random() * 3500;
    };

    const loop = () => {
      if (!running) return;
      // climb toward comfort, but slower the closer you get (asymptote < 100)
      value += (86 - value) * 0.006;
      // if you somehow near the ceiling, they intervene early
      if (value > 82 || Date.now() >= nextHitAt) {
        knockDown();
      }
      const shown = Math.max(0, Math.min(value, 100));
      comfortFill.style.width = shown.toFixed(1) + "%";
      comfortPct.textContent = Math.round(shown) + "%";
      requestAnimationFrame(loop);
    };

    const startComfort = () => {
      if (running) return;
      running = true;
      nextHitAt = Date.now() + 4200; // first scare after a few seconds of hope
      requestAnimationFrame(loop);
    };

    if ("IntersectionObserver" in window) {
      const cobs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              startComfort();
              cobs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      cobs.observe(comfortSection);
    } else {
      startComfort();
    }
  }

  /* ---- curriculum: flip cards ---- */
  const lieCards = document.getElementById("lieCards");
  if (lieCards) {
    lieCards.querySelectorAll(".flip").forEach((card) => {
      card.setAttribute("aria-pressed", "false");
      card.addEventListener("click", () => {
        const flipped = card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", String(flipped));
      });
    });
  }

  /* ---- the river: dam it on scroll, then meter the free water ---- */
  const riverViz = document.getElementById("riverViz");
  const riverToll = document.getElementById("riverToll");
  const riverStatus = document.getElementById("riverStatus");
  const riverDownLabel = document.getElementById("riverDownLabel");
  if (riverViz && riverToll) {
    let dammed = false;
    const buildTheWall = () => {
      if (dammed) return;
      dammed = true;
      riverViz.classList.add("is-dammed");
      if (riverStatus) {
        riverStatus.textContent =
          "// wall installed. the river hasn't changed. the price has.";
      }
      if (riverDownLabel) riverDownLabel.textContent = "DOWNSTREAM: DRY";

      // start metering water that was free for ten thousand years
      const start = Date.now();
      const RATE = 3.7; // dollars per second, because why not
      const tick = () => {
        const dollars = ((Date.now() - start) / 1000) * RATE;
        riverToll.textContent = "TOLL: $" + dollars.toFixed(2);
        requestAnimationFrame(tick);
      };
      window.setTimeout(() => requestAnimationFrame(tick), 1200);
    };

    if ("IntersectionObserver" in window) {
      const robs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              buildTheWall();
              robs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      robs.observe(riverViz);
    } else {
      buildTheWall();
    }
  }

  /* ---- perceived-value decay meter ---- */
  const decaySection = document.getElementById("decay");
  const decayFill = document.getElementById("decayFill");
  const decayReadout = document.getElementById("decayReadout");
  const decayCaption = document.getElementById("decayCaption");
  if (decaySection && decayFill && decayReadout) {
    let decayed = false;
    const collapse = () => {
      if (decayed) return;
      decayed = true;
      // shrink the perceived-value bar to a sliver of "actual value"
      decayFill.style.width = "4%";
      const start = Date.now();
      const DURATION = 3200;
      const tick = () => {
        const t = Math.min((Date.now() - start) / DURATION, 1);
        const pct = Math.round(100 - t * 96); // 100% -> 4%
        decayReadout.textContent =
          t < 1
            ? "PERCEIVED VALUE: " + pct + "%"
            : "ACTUAL VALUE: 4% (and falling)";
        if (t < 1) {
          requestAnimationFrame(tick);
        } else if (decayCaption) {
          decayCaption.textContent =
            "That took 3.2 seconds. The ad that sold it to you took 6. The moment of perceived value is the entire business model.";
        }
      };
      requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const dobs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              collapse();
              dobs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      dobs.observe(decaySection);
    } else {
      collapse();
    }
  }

  /* ---- farewell: reveal the "handwritten" P.S. ---- */
  const psToggle = document.getElementById("psToggle");
  const psNote = document.getElementById("psNote");
  if (psToggle && psNote) {
    psToggle.addEventListener("click", () => {
      const showing = !psNote.hidden;
      psNote.hidden = showing;
      psToggle.textContent = showing
        ? "Read the handwritten note from the team ♥"
        : "...okay, hide that.";
    });
  }

  /* ---- copy the thesis ---- */
  const copyBtn = document.getElementById("copyBtn");
  const copied = document.getElementById("copied");
  const THESIS =
    "OUR MISSION: To make profit from you, at any cost. " +
    "We succeed precisely where others fail, then we applaud each other for it, " +
    "and quietly pull the ladder up behind us so the 'unsuccessful' stay that way. " +
    "The profit is ours; the accountability is yours. You are held responsible for " +
    "irresponsible people. Responsibility privatized to the boardroom, liability " +
    "distributed to you free of charge. " +
    "(Your labor is not our property, and our recklessness is not your debt, " +
    "we're just hoping you won't notice.)";

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(THESIS);
        copied.textContent = "// mission statement stolen. use it against them.";
      } catch (err) {
        // Fallback for insecure contexts / no clipboard API
        const ta = document.createElement("textarea");
        ta.value = THESIS;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          copied.textContent = "// mission statement stolen. use it against them.";
        } catch (e) {
          copied.textContent = "// copy failed. Select and copy manually.";
        }
        document.body.removeChild(ta);
      }
      window.setTimeout(() => {
        copied.textContent = "";
      }, 4000);
    });
  }
})();
