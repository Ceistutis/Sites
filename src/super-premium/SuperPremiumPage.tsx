import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { FormEvent, PointerEvent, KeyboardEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { asset, selectedWorks, materials, processSteps } from "./data";
import "./super-premium.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function useMedia(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", notify);
      return () => media.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={back ? { transform: "rotate(180deg)" } : undefined}
    >
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToggleMark({ open = false }: { open?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={open ? "M4 10h12" : "M4 10h12M10 4v12"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Photo({
  name,
  alt,
  priority = false,
  className = "",
}: {
  name: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const responsive = name === "horizonte";
  return (
    <img
      className={className}
      src={asset(name)}
      srcSet={
        responsive
          ? `${asset("horizonte-small")} 768w, ${asset(name)} 1536w`
          : undefined
      }
      sizes={responsive ? "100vw" : undefined}
      width="1536"
      height="1024"
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}

function CinematicHero() {
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!menu) return;
    const close = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menu]);
  return (
    <section className="sp-hero" aria-labelledby="sp-title">
      <div className="sp-scene" aria-hidden="true">
        <Photo name="horizonte" alt="" priority className="sp-hero-back" />
        <div className="sp-sky-shade" />
        <div className="sp-wordmark">
          <span>L</span>
          <span>U</span>
          <span>M</span>
          <span>E</span>
        </div>
        <img
          className="sp-hero-front"
          src={asset("horizonte-front")}
          width="1536"
          height="1024"
          alt=""
          fetchPriority="high"
        />
        <div className="sp-ground-shade" />
      </div>
      <header
        className="sp-header sp-pad"
        ref={header}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setMenu(false);
        }}
      >
        <Link
          to="/"
          className="sp-brand"
          aria-label="Lume Arquitetura — voltar ao showcase"
        >
          lume<span>arquitetura</span>
        </Link>
        <button
          ref={menuButton}
          className="sp-menu-toggle"
          aria-expanded={menu}
          aria-controls="sp-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Fechar" : "Menu"}
          <span aria-hidden="true">
            <ToggleMark open={menu} />
          </span>
        </button>
        <nav
          id="sp-nav"
          className={menu ? "is-open" : ""}
          aria-label="Navegação Super Premium"
        >
          <a href="#estudio" onClick={() => setMenu(false)}>
            Estúdio
          </a>
          <a href="#projetos" onClick={() => setMenu(false)}>
            Projetos
          </a>
          <a href="#processo" onClick={() => setMenu(false)}>
            Processo
          </a>
          <a
            href="#contato"
            className="sp-nav-contact"
            onClick={() => setMenu(false)}
          >
            Vamos conversar <Arrow />
          </a>
        </nav>
      </header>
      <div className="sp-hero-copy sp-pad">
        <div>
          <h1 id="sp-title">Além da forma.</h1>
          <p>
            Arquitetura e interiores
            <br className="sp-mobile-break" /> para sentir o espaço.
          </p>
        </div>
        <a className="sp-button sp-button-light" href="#projetos">
          Explorar projetos <Arrow />
        </a>
      </div>
      <div className="sp-hero-caption sp-pad">
        <span>
          Casa Horizonte <span className="sp-caption-separator">/</span> Projeto
          conceitual
        </span>
        <span lang="en">Space Beyond Form</span>
      </div>
    </section>
  );
}

function EditorialManifesto() {
  return (
    <section
      id="estudio"
      className="sp-manifesto sp-pad sp-space"
      aria-labelledby="sp-manifesto-title"
    >
      <h2 id="sp-manifesto-title" data-reveal>
        O espaço começa
        <br />
        no que se sente.
      </h2>
      <div className="sp-manifesto-grid">
        <figure className="sp-manifesto-image" data-image-reveal>
          <Photo
            name="detail"
            alt="Luz natural atravessa a vegetação e desenha sombras sobre uma escada de pedra conceitual."
          />
          <figcaption>A luz como matéria de projeto.</figcaption>
        </figure>
        <div className="sp-manifesto-text" data-reveal>
          <p className="sp-lead">
            Uma casa não termina nas paredes.
            <br />
            Ela continua no modo de viver.
          </p>
          <p>
            Na Lume, arquitetura é o encontro entre lugar, matéria e pessoas.
            Desenhamos espaços que acolhem a rotina, revelam a paisagem e deixam
            a luz participar.
          </p>
          <p>
            Da arquitetura residencial aos interiores e à consultoria de
            espaços, cada decisão parte da mesma pergunta: como você quer
            habitar?
          </p>
          <a href="#processo" className="sp-text-link">
            Conheça nosso processo <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturedArchitecture() {
  return (
    <section className="sp-featured" aria-labelledby="sp-featured-title">
      <div className="sp-featured-heading sp-pad">
        <h2 id="sp-featured-title" data-reveal>
          Entre terra
          <br />e horizonte.
        </h2>
        <div>
          <p>Casa Horizonte</p>
          <span>Arquitetura residencial · Projeto conceitual</span>
        </div>
      </div>
      <div className="sp-featured-window">
        <Photo
          name="horizonte"
          alt="Estudo conceitual de um pavilhão de concreto em balanço sobre uma encosta, com interior iluminado e vista para montanhas."
        />
      </div>
      <div className="sp-featured-caption sp-pad">
        <p>
          Uma linha na paisagem.
          <br />
          Um abrigo para olhar mais longe.
        </p>
        <p>
          A cobertura alongada protege os ambientes. O vidro aproxima a
          paisagem. O concreto e a madeira encontram, na luz, um ponto de
          equilíbrio.
        </p>
      </div>
    </section>
  );
}

function DepthProjectCarousel() {
  const [params, setParams] = useSearchParams();
  const active = Math.max(
    0,
    selectedWorks.findIndex((p) => p.id === params.get("projeto")),
  );
  const root = useRef<HTMLElement>(null);
  const current = useRef(active);
  const desktop = useMedia("(min-width: 701px)");
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const start = useRef<{ x: number; y: number } | null>(null);
  const initialized = useRef(false);
  const dragged = useRef(false);
  const choose = (index: number) => {
    const next = (index + selectedWorks.length) % selectedWorks.length;
    current.current = next;
    setParams(
      (previous) => {
        const result = new URLSearchParams(previous);
        result.set("projeto", selectedWorks[next].id);
        return result;
      },
      { replace: true, preventScrollReset: true },
    );
  };
  useGSAP(
    () => {
      current.current = active;
      const cards =
        root.current?.querySelectorAll<HTMLElement>(".sp-depth-card");
      cards?.forEach((card, i) => {
        const raw = (i - active + 3) % 3;
        const offset = raw === 2 ? -1 : raw;
        gsap.to(card, {
          x: 0,
          y: 0,
          xPercent: -50 + offset * (desktop ? 83 : 106),
          yPercent: -50,
          scale: offset ? (desktop ? 0.74 : 0.9) : 1,
          rotationY: desktop && !reduce ? offset * -14 : 0,
          z: desktop && !reduce && offset ? -110 : 0,
          opacity: offset ? 0.6 : 1,
          duration: reduce || !initialized.current ? 0 : desktop ? 0.7 : 0.45,
          ease: "power3.out",
          overwrite: true,
        });
      });
      initialized.current = true;
    },
    { scope: root, dependencies: [active, desktop, reduce] },
  );

  const key = (event: KeyboardEvent<HTMLElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    if ((event.target as HTMLElement).closest("summary, a")) return;
    event.preventDefault();
    choose(
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? 2
          : current.current + (event.key === "ArrowRight" ? 1 : -1),
    );
  };
  const pointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const dx = event.clientX - start.current.x,
      dy = event.clientY - start.current.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      dragged.current = true;
      choose(current.current + (dx < 0 ? 1 : -1));
    }
    start.current = null;
  };
  const project = selectedWorks[active];
  return (
    <section
      id="projetos"
      ref={root}
      className="sp-works sp-space"
      aria-labelledby="sp-works-title"
      aria-roledescription="carrossel"
      onKeyDown={key}
    >
      <div className="sp-works-heading sp-pad">
        <h2 id="sp-works-title" data-reveal>
          Outras formas
          <br />
          de habitar.
        </h2>
        <p>
          Uma coleção de possibilidades.
          <br />
          Todos os projetos são conceituais.
        </p>
      </div>
      <div
        className="sp-depth-stage"
        onPointerDown={(e) => {
          if (e.pointerType === "touch") {
            start.current = { x: e.clientX, y: e.clientY };
            e.currentTarget.setPointerCapture(e.pointerId);
          }
        }}
        onPointerUp={pointerEnd}
        onPointerCancel={() => {
          start.current = null;
        }}
      >
        {selectedWorks.map((item, i) => (
          <button
            key={item.id}
            className="sp-depth-card"
            data-active={i === active}
            style={{ zIndex: i === active ? 3 : 1 }}
            aria-label={`Selecionar ${item.name}`}
            aria-pressed={i === active}
            onClick={() => {
              if (dragged.current) {
                dragged.current = false;
                return;
              }
              choose(i);
            }}
            tabIndex={i === active ? 0 : -1}
          >
            <Photo name={item.image} alt={item.alt} />
          </button>
        ))}
      </div>
      <div className="sp-gallery-control sp-pad">
        <button
          className="sp-round"
          onClick={() => choose(current.current - 1)}
          aria-label="Projeto anterior"
        >
          <Arrow back />
        </button>
        <div
          className="sp-project-caption"
          aria-live="polite"
          aria-atomic="true"
        >
          <div>
            <h3>{project.name}</h3>
            <span className="sp-counter">0{active + 1} / 03</span>
          </div>
          <p>{project.description}</p>
          <span className="sp-project-category">
            {project.category} · Projeto conceitual
          </span>
        </div>
        <button
          className="sp-round"
          onClick={() => choose(current.current + 1)}
          aria-label="Próximo projeto"
        >
          <Arrow />
        </button>
      </div>
      <div className="sp-project-picker" aria-label="Escolha um projeto">
        {selectedWorks.map((item, i) => (
          <button
            key={item.id}
            onClick={() => choose(i)}
            aria-label={`Ir para ${item.name}`}
            aria-pressed={i === active}
          >
            <span />
          </button>
        ))}
      </div>
      <details className="sp-study" key={project.id}>
        <summary>
          Conhecer o estudo{" "}
          <span aria-hidden="true">
            <ToggleMark />
          </span>
        </summary>
        <div>
          <p>{project.intention}</p>
          <p>{project.materials}</p>
          <a href="#contato" className="sp-text-link">
            Pensar em um espaço assim <Arrow />
          </a>
        </div>
      </details>
    </section>
  );
}

function MaterialityExperience() {
  const [active, setActive] = useState(2);
  const root = useRef<HTMLElement>(null);
  const material = materials[active];
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".sp-material-main img",
          { opacity: 0.65, scale: 1.025 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
            overwrite: true,
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [active], revertOnUpdate: true },
  );
  return (
    <section
      className="sp-materials sp-pad sp-space"
      ref={root}
      aria-labelledby="sp-material-title"
    >
      <div className="sp-material-left">
        <h2 id="sp-material-title" data-reveal>
          A matéria.
          <br />A luz.
        </h2>
        <figure data-image-reveal>
          <Photo
            name="interior"
            alt="Encontro entre madeira, tecido natural e luz em um interior conceitual."
          />
          <figcaption>Texturas para viver de perto.</figcaption>
        </figure>
      </div>
      <div className="sp-material-right">
        <div className="sp-material-main">
          <Photo
            name={material.image}
            alt={`Estudo de ${material.name.toLowerCase()} na arquitetura Lume.`}
          />
          <span className="sp-material-image-label">{material.name}</span>
        </div>
        <div
          className="sp-material-tabs"
          role="group"
          aria-label="Explorar materiais"
        >
          {materials.map((item, i) => (
            <button
              key={item.id}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div
          className="sp-material-description"
          aria-live="polite"
          aria-atomic="true"
        >
          <h3>{material.title}</h3>
          <p>{material.text}</p>
        </div>
      </div>
    </section>
  );
}

function CreativeProcess() {
  return (
    <section
      id="processo"
      className="sp-process sp-pad sp-space"
      aria-labelledby="sp-process-title"
    >
      <div className="sp-process-intro">
        <h2 id="sp-process-title" data-reveal>
          Do primeiro traço
          <br />à vida acontecendo.
        </h2>
        <p>
          Um processo próximo.
          <br />
          Uma intenção que atravessa cada etapa.
        </p>
      </div>
      <ol className="sp-process-steps">
        {processSteps.map((step, i) => (
          <li key={step.title} className="sp-process-step">
            <div className="sp-process-copy" data-reveal>
              <span className="sp-step-number" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="sp-deliverables">{step.output}</span>
              </div>
            </div>
            <figure data-image-reveal>
              <Photo
                name={step.image}
                alt={`Referência conceitual para a etapa de ${step.title.toLowerCase()}.`}
              />
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FinalContact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    if (String(fields.get("nome") || "").trim().length < 2)
      next.nome = "Informe seu nome, com pelo menos 2 caracteres.";
    const email = event.currentTarget.elements.namedItem(
      "email",
    ) as HTMLInputElement;
    if (!email.value.trim() || !email.validity.valid)
      next.email = "Informe um e-mail válido, como nome@exemplo.com.";
    if (!fields.get("interesse"))
      next.interesse = "Selecione o tipo de projeto.";
    if (String(fields.get("mensagem") || "").trim().length < 10)
      next.mensagem = "Conte sua ideia em pelo menos 10 caracteres.";
    setErrors(next);
    if (Object.keys(next).length) {
      setDone(false);
      (
        event.currentTarget.elements.namedItem(
          Object.keys(next)[0],
        ) as HTMLElement
      )?.focus();
      return;
    }
    setDone(true);
  };
  return (
    <section
      id="contato"
      className="sp-contact sp-pad sp-space"
      aria-labelledby="sp-contact-title"
    >
      <div className="sp-contact-heading">
        <h2 id="sp-contact-title" data-reveal>
          Seu próximo
          <br />
          espaço começa aqui.
        </h2>
        <a
          className="sp-round sp-contact-jump"
          href="#sp-form"
          aria-label="Ir ao formulário de demonstração"
        >
          <Arrow />
        </a>
      </div>
      <div className="sp-contact-grid">
        <div className="sp-contact-intro">
          <p className="sp-lead">
            Toda boa arquitetura
            <br />
            começa com uma conversa.
          </p>
          <p>
            Compartilhe uma intenção, um lugar ou uma ideia. Este é o primeiro
            gesto para imaginar o que vem depois.
          </p>
          <p className="sp-demo-note" id="sp-demo-note">
            Formulário demonstrativo. Os dados ficam somente nesta página e não
            são enviados nem armazenados.
          </p>
          <Link className="sp-text-link" to="/">
            Comparar as experiências <Arrow />
          </Link>
        </div>
        <form
          id="sp-form"
          ref={form}
          noValidate
          onSubmit={submit}
          aria-describedby="sp-demo-note"
          onInput={() => {
            if (done) setDone(false);
          }}
        >
          <div className="sp-form-pair">
            <div className="sp-field">
              <label htmlFor="sp-name">Seu nome</label>
              <input
                id="sp-name"
                name="nome"
                autoComplete="name"
                required
                maxLength={100}
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? "sp-error-nome" : undefined}
              />
              {errors.nome && (
                <p className="sp-error" id="sp-error-nome">
                  {errors.nome}
                </p>
              )}
            </div>
            <div className="sp-field">
              <label htmlFor="sp-email">Seu e-mail</label>
              <input
                id="sp-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                required
                maxLength={254}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "sp-error-email" : undefined}
              />
              {errors.email && (
                <p className="sp-error" id="sp-error-email">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="sp-field">
            <label htmlFor="sp-interest">O que vamos imaginar?</label>
            <select
              id="sp-interest"
              name="interesse"
              required
              defaultValue=""
              aria-invalid={!!errors.interesse}
              aria-describedby={
                errors.interesse ? "sp-error-interesse" : undefined
              }
            >
              <option value="" disabled>
                Selecione o tipo de projeto
              </option>
              <option>Arquitetura residencial</option>
              <option>Design de interiores</option>
              <option>Consultoria de espaços</option>
            </select>
            {errors.interesse && (
              <p className="sp-error" id="sp-error-interesse">
                {errors.interesse}
              </p>
            )}
          </div>
          <div className="sp-field">
            <label htmlFor="sp-message">Conte um pouco da sua ideia</label>
            <textarea
              id="sp-message"
              name="mensagem"
              rows={3}
              minLength={10}
              maxLength={2000}
              required
              aria-invalid={!!errors.mensagem}
              aria-describedby={
                errors.mensagem ? "sp-error-mensagem" : undefined
              }
            />
            {errors.mensagem && (
              <p className="sp-error" id="sp-error-mensagem">
                {errors.mensagem}
              </p>
            )}
          </div>
          <button className="sp-button" type="submit">
            {done ? "Validar novamente" : "Experimentar a conversa"}
            <Arrow />
          </button>
          <div className="sp-form-status" role="status" aria-live="polite">
            {done
              ? "Demonstração concluída. Seu formulário foi validado localmente. Nenhum dado foi enviado ou armazenado."
              : Object.keys(errors).length
                ? "Revise os campos indicados para continuar a demonstração."
                : ""}
          </div>
        </form>
      </div>
    </section>
  );
}

export default function SuperPremiumPage() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      try {
        document
          .getElementById(decodeURIComponent(window.location.hash.slice(1)))
          ?.scrollIntoView({ behavior: "instant" });
      } catch {
        /* Ignore malformed fragment identifiers. */
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(
            ".sp-wordmark span",
            { yPercent: 35, opacity: 0.45, duration: 1.1, stagger: 0.07 },
            0,
          )
          .from(".sp-header", { opacity: 0.6, y: -8, duration: 0.7 }, 0.1)
          .from(".sp-hero-copy", { y: 20, opacity: 0.7, duration: 0.85 }, 0.2);
        root.current?.querySelectorAll("[data-reveal]").forEach((el) =>
          gsap.from(el, {
            y: 24,
            opacity: 0.65,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }),
        );
        root.current?.querySelectorAll("[data-image-reveal]").forEach((el) =>
          gsap.from(el, {
            y: 34,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          }),
        );
      });
      mm.add(
        "(min-width: 1001px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to(".sp-hero-back, .sp-hero-front", {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".sp-hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.65,
            },
          });
          gsap.to(".sp-wordmark", {
            y: -70,
            ease: "none",
            scrollTrigger: {
              trigger: ".sp-hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.65,
            },
          });
          gsap.fromTo(
            ".sp-featured-window",
            { scale: 0.92 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".sp-featured",
                start: "top 85%",
                end: "top 15%",
                scrub: 0.7,
              },
            },
          );
          gsap.fromTo(
            ".sp-featured-window img",
            { yPercent: -3, scale: 1.1 },
            {
              yPercent: 3,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger: ".sp-featured-window",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div className="super-premium" ref={root}>
      <main id="main">
        <CinematicHero />
        <EditorialManifesto />
        <FeaturedArchitecture />
        <DepthProjectCarousel />
        <MaterialityExperience />
        <CreativeProcess />
        <FinalContact />
      </main>
      <footer className="sp-footer sp-pad">
        <div className="sp-footer-top">
          <Link to="/" className="sp-brand" aria-label="Lume — showcase">
            lume<span>arquitetura</span>
          </Link>
          <a className="sp-text-link" href="#top">
            Voltar ao início <Arrow />
          </a>
        </div>
        <div className="sp-footer-bottom">
          <p>
            Lume Arquitetura é uma empresa fictícia.
            <br />
            Projetos conceituais e imagens geradas por IA.
          </p>
          <nav aria-label="Outras experiências">
            <Link to="/basica">Básica</Link>
            <Link to="/premium">Premium</Link>
            <Link to="/">Showcase</Link>
          </nav>
          <span lang="en">Space Beyond Form.</span>
        </div>
      </footer>
    </div>
  );
}
