/**
 * Scroll motion for nilix.co. Everything here is enhancement: without it (or with
 * "reduce motion" on) every section is already laid out and readable.
 *
 * Hooks, all driven by data attributes:
 *   section[data-scene]      the page colour eases to that scene while the section is in view
 *   [data-reveal]            fades/rises in once ("fade", "scale" variants)
 *   [data-stagger]           its children reveal one after another
 *   [data-parallax="0.2"]    drifts against the scroll
 *   [data-story]             pinned phone story: [data-story-step] blocks swap [data-story-screen]s
 *   [data-track]             horizontal pinned journey with a progress line
 *   [data-hero]              hero phone tilts back and the headline lifts away
 *   [data-count]             counts up to its number
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const root = document.documentElement;
const motion = root.classList.contains('motion');
const rtl = root.dir === 'rtl';

if (motion) {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  // in-page anchors go through Lenis so they glide too
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a || a.getAttribute('href') === '#') return;
    const target = document.querySelector(a.getAttribute('href')!);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: -96 });
    history.replaceState(null, '', a.getAttribute('href'));
  });

  // ---- scenes: the page colour follows the section in the middle of the screen
  const scenes = gsap.utils.toArray<HTMLElement>('section[data-scene].blend');
  if (scenes.length) {
    const setScene = (s: string) => { if (root.dataset.scene !== s) root.dataset.scene = s; };
    scenes.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setScene(el.dataset.scene!),
      });
    });
  }

  // ---- reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
    const kids = Array.from(group.children) as HTMLElement[];
    gsap.set(kids, { opacity: 0, y: 40 });
    gsap.to(kids, {
      opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  // ---- parallax
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const k = parseFloat(el.dataset.parallax || '0.2');
    gsap.fromTo(el, { yPercent: -k * 50 }, {
      yPercent: k * 50, ease: 'none',
      scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // ---- counters
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count!);
    const fa = root.lang === 'fa';
    const o = { v: 0 };
    gsap.to(o, {
      v: end, duration: 1.6, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString(fa ? 'fa-IR' : 'en-US'); },
    });
  });

  const mm = gsap.matchMedia();

  // ---- hero
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    const words = hero.querySelectorAll<HTMLElement>('[data-word]');
    gsap.from(words, { yPercent: 110, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.07, delay: 0.1 });
    gsap.from(hero.querySelectorAll('[data-hero-in]'), { y: 30, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, delay: 0.45 });
    const phone = hero.querySelector<HTMLElement>('[data-hero-phone]');
    if (phone) {
      gsap.from(phone, { y: 140, rotate: rtl ? -8 : 8, opacity: 0, duration: 1.6, ease: 'expo.out', delay: 0.25 });
      mm.add('(min-width: 900px)', () => {
        gsap.to(phone, {
          y: -60, rotateX: 18, rotateY: rtl ? 14 : -14, scale: 0.86, ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
        });
      });
    }
    gsap.utils.toArray<HTMLElement>(hero.querySelectorAll('[data-float]')).forEach((el, i) => {
      gsap.to(el, { y: i % 2 ? -14 : 14, duration: 2.6 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to(el, {
        y: (i % 2 ? -1 : 1) * (120 + i * 40), ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    });
    const head = hero.querySelector<HTMLElement>('[data-hero-head]');
    if (head) gsap.to(head, { y: -80, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  // ---- marquee speed follows scroll velocity
  gsap.utils.toArray<HTMLElement>('[data-marquee]').forEach((track) => {
    const dir = rtl ? 1 : -1;
    const tween = gsap.to(track, { xPercent: dir * 50, duration: 40, ease: 'none', repeat: -1 });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 300, 6);
        gsap.to(tween, { timeScale: 1 + v, duration: 0.3, overwrite: true });
        gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.3 });
      },
    });
  });

  // ---- pinned phone story (desktop): the phone stays, its screen follows the text
  mm.add('(min-width: 900px)', () => {
    document.querySelectorAll<HTMLElement>('[data-story]').forEach((story) => {
      const steps = story.querySelectorAll<HTMLElement>('[data-story-step]');
      const screens = story.querySelectorAll<HTMLElement>('[data-story-screen]');
      const dots = story.querySelectorAll<HTMLElement>('[data-story-dot]');
      const show = (i: number) => {
        screens.forEach((s, j) => s.classList.toggle('on', j === i));
        steps.forEach((s, j) => s.classList.toggle('on', j === i));
        dots.forEach((d, j) => d.classList.toggle('on', j <= i));
      };
      show(0);
      steps.forEach((step, i) => {
        ScrollTrigger.create({ trigger: step, start: 'top 60%', end: 'bottom 60%', onToggle: (s) => s.isActive && show(i) });
      });
      const phone = story.querySelector<HTMLElement>('[data-story-phone]');
      if (phone) {
        gsap.fromTo(phone, { rotate: rtl ? 4 : -4 }, {
          rotate: rtl ? -4 : 4, ease: 'none',
          scrollTrigger: { trigger: story, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }
    });
  });

  // ---- horizontal journey (desktop): pin, slide the track sideways, fill the line
  mm.add('(min-width: 900px)', () => {
    document.querySelectorAll<HTMLElement>('[data-track]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-track-inner]')!;
      const fill = section.querySelector<HTMLElement>('[data-track-fill]');
      const mover = section.querySelector<HTMLElement>('[data-track-mover]');
      const cards = track.querySelectorAll<HTMLElement>('[data-track-card]');
      const distance = () => Math.max(0, track.scrollWidth - section.clientWidth + 80);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, start: 'top top', end: () => `+=${distance() + window.innerHeight * 0.6}`,
          pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
        },
      });
      tl.to(track, { x: () => (rtl ? distance() : -distance()), ease: 'none' }, 0);
      if (fill) tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
      if (mover) tl.fromTo(mover, { left: rtl ? '100%' : '0%' }, { left: rtl ? '0%' : '100%', ease: 'none' }, 0);
      cards.forEach((card, i) => {
        tl.fromTo(card, { opacity: 0.35, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.08, ease: 'power2.out' }, (i / cards.length) * 0.92);
      });
      return () => gsap.set([track, fill, mover, ...cards].filter(Boolean), { clearProps: 'all' });
    });
  });

  // ---- big words that slide across as you scroll
  gsap.utils.toArray<HTMLElement>('[data-slide-x]').forEach((el) => {
    const k = parseFloat(el.dataset.slideX || '20') * (rtl ? -1 : 1);
    gsap.fromTo(el, { xPercent: k }, { xPercent: -k, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // ---- orbit: integration nodes swing in around the hub
  gsap.utils.toArray<HTMLElement>('[data-orbit]').forEach((orbit) => {
    const ring = orbit.querySelector<HTMLElement>('[data-orbit-ring]');
    if (ring) gsap.to(ring, { rotate: 360, duration: 60, ease: 'none', repeat: -1 });
    gsap.from(orbit.querySelectorAll('[data-orbit-node] > span'), {
      scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.6)', stagger: 0.08,
      scrollTrigger: { trigger: orbit, start: 'top 75%', once: true },
    });
  });

  // ---- pointer parallax: background shapes lean toward the cursor
  const leaners = gsap.utils.toArray<HTMLElement>('[data-pointer]');
  if (leaners.length && matchMedia('(pointer: fine)').matches) {
    const movers = leaners.map((el) => ({
      k: parseFloat(el.dataset.pointer || '1'),
      x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
    }));
    addEventListener('pointermove', (e) => {
      const dx = e.clientX / innerWidth - 0.5;
      const dy = e.clientY / innerHeight - 0.5;
      movers.forEach((m) => { m.x(dx * 40 * m.k); m.y(dy * 40 * m.k); });
    });
  }

  // ---- hero order tracker: steps light up one after another
  document.querySelectorAll<HTMLElement>('[data-ticker]').forEach((box) => {
    const items = box.querySelectorAll('li');
    let i = 0;
    setInterval(() => {
      i = (i + 1) % items.length;
      items.forEach((li, j) => { li.classList.toggle('on', j === i); li.classList.toggle('done', j < i); });
    }, 1800);
  });

  // ---- statement: words light up as you read down
  gsap.utils.toArray<HTMLElement>('[data-words]').forEach((p) => {
    gsap.to(p.children, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
  });

  // ---- tilt: cards lean a little toward the pointer
  if (matchMedia('(pointer: fine)').matches) {
    gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach((card) => {
      gsap.set(card, { transformPerspective: 900 });
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
      });
      card.addEventListener('pointerleave', () => { rx(0); ry(0); });
    });
  }

  ScrollTrigger.sort();
  addEventListener('load', () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
} else {
  // static page: the story shows its first screen, the rest stack below on small screens
  document.querySelectorAll<HTMLElement>('[data-story]').forEach((story) => {
    story.querySelector('[data-story-screen]')?.classList.add('on');
    story.querySelector('[data-story-step]')?.classList.add('on');
  });
}
