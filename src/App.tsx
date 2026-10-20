import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import "./App.css";

const SuperPremiumPage = lazy(() => import("./super-premium/SuperPremiumPage"));

const services = [
  {
    title: "Arquitetura residencial",
    short: "Casas para viver bem.",
    text: "Do primeiro estudo ao detalhamento, espaços que conectam sua rotina, o terreno e a luz natural.",
    image: "casa",
  },
  {
    title: "Design de interiores",
    short: "O cuidado está nos detalhes.",
    text: "Materiais, iluminação e mobiliário pensados em conjunto para criar ambientes que fazem sentido para você.",
    image: "interior",
  },
  {
    title: "Consultoria de espaços",
    short: "Clareza para transformar.",
    text: "Uma orientação direcionada para repensar o layout, escolher acabamentos e decidir os próximos passos.",
    image: "atelier",
  },
];
const projects = [
  {
    id: "casa-patio",
    name: "Casa Pátio",
    category: "Residencial",
    image: "casa",
    description:
      "Uma casa que se abre para dentro. O pátio aproxima os ambientes da vegetação, enquanto os beirais filtram a luz ao longo do dia.",
    material: "Pedra natural, madeira e vidro",
    brief: "Explorar a relação entre privacidade e integração com o jardim.",
  },
  {
    id: "apartamento-aurora",
    name: "Apartamento Aurora",
    category: "Interiores",
    image: "interior",
    description:
      "Texturas naturais e volumes discretos dão espaço à vida cotidiana. A luz atravessa cortinas leves e revela diferentes tons de madeira.",
    material: "Carvalho, linho e travertino",
    brief:
      "Unir estar e descanso com uma paleta acolhedora e circulação livre.",
  },
  {
    id: "atelier-jardim",
    name: "Ateliê Jardim",
    category: "Interiores",
    image: "atelier",
    description:
      "Um lugar para criar com calma. Uma bancada contínua, áreas de pausa e aberturas para o jardim aproximam trabalho e natureza.",
    material: "Madeira, concreto e vegetação",
    brief:
      "Transformar um ambiente de trabalho em espaço de concentração e encontro.",
  },
];
type Project = (typeof projects)[number];
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? "↗" : "→"}
    </span>
  );
}
function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      className={className}
      src={`${import.meta.env.BASE_URL}images/${name}.webp`}
      alt={alt}
      width="1536"
      height="1024"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
function ButtonLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <a className="button" href={to}>
      {children}
      <Arrow />
    </a>
  );
}
function Brand() {
  return (
    <Link
      className="brand"
      to="/"
      aria-label="Lume Arquitetura — voltar ao showcase"
    >
      lume.<small>arquitetura</small>
    </Link>
  );
}
function Header({
  premium = false,
  home = false,
}: {
  premium?: boolean;
  home?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location]);
  return (
    <header className="site-header frame">
      <Brand />
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Fechar" : "Menu"}
        <span aria-hidden="true">{open ? "×" : "+"}</span>
      </button>
      <nav
        id="main-nav"
        aria-label="Navegação principal"
        className={open ? "is-open" : ""}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
          }
        }}
      >
        {home ? (
          <>
            <a href="#comparar" onClick={() => setOpen(false)}>
              Compare as versões
            </a>
            <Link to="/basica">Básica</Link>
            <Link className="nav-cta" to="/premium">
              Explore a Premium <Arrow diagonal />
            </Link>
          </>
        ) : (
          <>
            <a href="#sobre" onClick={() => setOpen(false)}>
              Estúdio
            </a>
            {premium && (
              <a href="#projetos" onClick={() => setOpen(false)}>
                Projetos
              </a>
            )}
            <a href="#servicos" onClick={() => setOpen(false)}>
              Serviços
            </a>
            <a
              className="nav-cta"
              href="#contato"
              onClick={() => setOpen(false)}
            >
              Vamos conversar <Arrow diagonal />
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
function VersionBar({ premium }: { premium: boolean }) {
  return (
    <div className="version-bar">
      <Link to="/">← Voltar ao showcase</Link>
      <span>Experiência {premium ? "Premium" : "Básica"}</span>
      <Link to={premium ? "/basica" : "/premium"}>
        Ver {premium ? "Básica" : "Premium"} <Arrow />
      </Link>
    </div>
  );
}
function Footer({ basic = false }: { basic?: boolean }) {
  return (
    <footer className={`footer ${basic ? "basic-footer" : ""}`}>
      <div className="frame">
        <div className="footer-top">
          <p>Espaço para o que importa.</p>
          <a href="#top">Voltar ao início ↑</a>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          lume.
        </div>
        <div className="footer-bottom">
          <p>
            Lume Arquitetura · Empresa fictícia
            <br />
            Showcase de design e desenvolvimento.
          </p>
          <p>
            Projetos conceituais · Imagens geradas por IA
            <br />
            Formulários locais, sem envio de dados.
          </p>
          <Link to="/">
            Comparar experiências <Arrow />
          </Link>
        </div>
      </div>
    </footer>
  );
}
function Intro() {
  return (
    <section id="sobre" className="frame section studio">
      <div>
        <h2>
          Tudo começa
          <br />
          com a escuta.
        </h2>
        <Photo
          name="atelier"
          alt="Estudo conceitual de ateliê iluminado pelo jardim"
        />
      </div>
      <div className="studio-copy">
        <p className="statement">
          Lume é a luz que revela o essencial. Arquitetura pensada para o seu
          cotidiano.
        </p>
        <p>
          Somos um estúdio fictício de arquitetura e interiores. Nosso olhar une
          materiais naturais, escolhas conscientes e atenção a cada maneira de
          habitar.
        </p>
        <p>
          Da primeira conversa ao desenho dos detalhes, a proposta é construir
          espaços com clareza, intenção e lugar para a sua história.
        </p>
        <a className="text-link" href="#contato">
          Conte o que você imagina <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
function Services({ premium = false }: { premium?: boolean }) {
  const [active, setActive] = useState(0);
  if (!premium)
    return (
      <section id="servicos" className="section frame basic-services">
        <div className="section-intro">
          <h2>Como podemos ajudar</h2>
          <p>
            Um olhar completo para sua casa,
            <br />
            do espaço aos detalhes.
          </p>
        </div>
        <div className="basic-service-grid">
          {services.map((s) => (
            <article key={s.title}>
              <Photo
                name={s.image}
                alt={`Estudo conceitual para ${s.title.toLowerCase()}`}
              />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a href="#contato" className="text-link">
                Conversar sobre o projeto <Arrow />
              </a>
            </article>
          ))}
        </div>
      </section>
    );
  return (
    <section id="servicos" className="services-premium">
      <div className="frame section">
        <div className="section-intro">
          <h2>
            Do espaço
            <br />
            ao detalhe.
          </h2>
          <p>
            Serviços que podem caminhar juntos
            <br />
            ou responder a uma necessidade específica.
          </p>
        </div>
        <div className="service-composition">
          <div>
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`service-item ${active === i ? "active" : ""}`}
              >
                <h3>
                  <button
                    aria-expanded={active === i}
                    aria-controls={`service-${i}`}
                    onClick={() => setActive(i)}
                  >
                    {s.title}
                    <span aria-hidden="true">{active === i ? "−" : "+"}</span>
                  </button>
                </h3>
                <div id={`service-${i}`} hidden={active !== i}>
                  <p>{s.text}</p>
                  <a href="#contato" className="text-link">
                    Planejar meu espaço <Arrow />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <figure key={active} className="service-visual">
            <Photo
              name={services[active].image}
              alt={`Conceito de ${services[active].title.toLowerCase()}`}
            />
            <figcaption>
              {services[active].short}
              <span>Estudo conceitual</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
function ProjectDialog({
  project,
  close,
}: {
  project: Project;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-title"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button
        className="dialog-close"
        onClick={close}
        aria-label="Fechar projeto"
      >
        ×
      </button>
      <Photo
        name={project.image}
        alt={`Imagem conceitual de ${project.name}`}
      />
      <div className="dialog-copy">
        <p>Projeto conceitual · {project.category}</p>
        <h2 id="project-title">{project.name}</h2>
        <p>{project.description}</p>
        <dl>
          <div>
            <dt>Intenção</dt>
            <dd>{project.brief}</dd>
          </div>
          <div>
            <dt>Materialidade</dt>
            <dd>{project.material}</dd>
          </div>
        </dl>
        <p className="note">
          Estudo fictício para este showcase. Imagem gerada por IA; não
          representa uma obra executada.
        </p>
        <button className="button" onClick={close}>
          Voltar aos projetos <Arrow />
        </button>
      </div>
    </dialog>
  );
}
function Portfolio() {
  const [params, setParams] = useSearchParams();
  const category = ["Residencial", "Interiores"].includes(
    params.get("categoria") || "",
  )
    ? params.get("categoria")!
    : "Todos";
  const [selected, setSelected] = useState<Project>();
  const trigger = useRef<HTMLButtonElement | null>(null);
  const visible = projects.filter(
    (p) => category === "Todos" || p.category === category,
  );
  return (
    <section id="projetos" className="section frame portfolio">
      <div className="section-intro">
        <h2>
          Possibilidades
          <br />
          de habitar.
        </h2>
        <div>
          <p>
            Projetos conceituais para explorar
            <br />a linguagem da Lume.
          </p>
          <div className="filters" role="group" aria-label="Filtrar projetos">
            {["Todos", "Residencial", "Interiores"].map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                onClick={() =>
                  setParams(c === "Todos" ? {} : { categoria: c }, {
                    preventScrollReset: true,
                  })
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="sr-only" role="status">
        {visible.length} projetos disponíveis
      </p>
      <div className={`project-grid count-${visible.length}`}>
        {visible.map((p) => (
          <article key={p.id} className="project">
            <button
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setSelected(p);
              }}
              aria-label={`Ver projeto ${p.name}`}
            >
              <div className="project-image">
                <Photo name={p.image} alt={`Estudo conceitual ${p.name}`} />
                <span className="project-open" aria-hidden="true">
                  ↗
                </span>
              </div>
              <div className="project-caption">
                <h3>{p.name}</h3>
                <span>{p.category} · Conceitual</span>
              </div>
            </button>
          </article>
        ))}
      </div>
      {selected && (
        <ProjectDialog
          project={selected}
          close={() => {
            setSelected(undefined);
            window.setTimeout(() => trigger.current?.focus(), 0);
          }}
        />
      )}
    </section>
  );
}
function Method() {
  return (
    <section className="frame section method">
      <div>
        <h2>
          Um caminho
          <br />
          compartilhado.
        </h2>
        <p>
          Você participa das decisões.
          <br />O projeto ganha forma com intenção.
        </p>
        <Photo
          name="detail"
          alt="Estudo de luz natural sobre materiais de arquitetura"
        />
      </div>
      <ol>
        {[
          [
            "Escutar",
            "Entendemos sua rotina, suas referências e os limites do projeto. O ponto de partida é o que importa para você.",
          ],
          [
            "Explorar",
            "Estudamos o espaço, a luz e as possibilidades. Apresentamos caminhos para conversar e escolher juntos.",
          ],
          [
            "Desenvolver",
            "Transformamos a direção escolhida em desenhos, materiais e soluções, com revisões ao longo do processo.",
          ],
          [
            "Detalhar",
            "Organizamos as definições e os documentos previstos no escopo para orientar os próximos passos da execução.",
          ],
        ].map(([title, text]) => (
          <li key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
function Contact({ premium = false }: { premium?: boolean }) {
  const [step, setStep] = useState(1),
    [done, setDone] = useState(false),
    [dirty, setDirty] = useState(false);
  const formRef = useRef<HTMLFormElement>(null),
    statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!dirty || done) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, done]);
  function submit(e: FormEvent) {
    e.preventDefault();
    if (premium && step === 1) {
      setStep(2);
      window.setTimeout(
        () =>
          formRef.current
            ?.querySelector<HTMLInputElement>('[name="nome"]')
            ?.focus(),
        0,
      );
    } else {
      setDone(true);
      setDirty(false);
      window.setTimeout(() => statusRef.current?.focus(), 0);
    }
  }
  return (
    <section id="contato" className="contact-section">
      <div className="frame section contact-grid">
        <div>
          <h2>
            Seu próximo
            <br />
            espaço começa aqui.
          </h2>
          <p>
            Conte um pouco sobre o que você imagina.
            <br />
            Vamos dar forma a essa primeira ideia.
          </p>
          <p className="contact-note">
            Esta é uma demonstração. Os dados ficam apenas nesta página e não
            são enviados nem armazenados.
          </p>
        </div>
        <div>
          <div className="form-progress">
            {premium ? (
              <>
                <span className={step === 1 ? "current" : ""}>Seu projeto</span>
                <Arrow />
                <span className={step === 2 ? "current" : ""}>Sobre você</span>
              </>
            ) : (
              <span>Uma primeira conversa</span>
            )}
          </div>
          {done ? (
            <div
              className="form-success"
              role="status"
              tabIndex={-1}
              ref={statusRef}
            >
              <h3>Demonstração concluída.</h3>
              <p>
                Você percorreu o formulário de{" "}
                {premium ? "orçamento" : "contato"} da Lume. Nenhuma mensagem
                foi enviada e nenhum dado foi salvo.
              </p>
              <button
                className="button"
                onClick={() => {
                  setDone(false);
                  setStep(1);
                }}
              >
                Experimentar novamente <Arrow />
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={submit}
              onChange={() => setDirty(true)}
            >
              <div hidden={premium && step !== 1}>
                <label htmlFor="tipo">O que você quer transformar?</label>
                <select
                  id="tipo"
                  name="servico"
                  required
                  disabled={premium && step !== 1}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione um serviço
                  </option>
                  {services.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                </select>
                {premium && (
                  <>
                    <label htmlFor="fase">
                      Em que momento está seu projeto?
                    </label>
                    <select
                      id="fase"
                      name="fase"
                      required
                      disabled={step !== 1}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selecione uma etapa
                      </option>
                      <option>Estou explorando ideias</option>
                      <option>Já tenho um imóvel ou terreno</option>
                      <option>Quero transformar um espaço existente</option>
                    </select>
                    <label htmlFor="ideia">
                      Sua ideia, em poucas palavras <span>(opcional)</span>
                    </label>
                    <textarea
                      id="ideia"
                      name="ideia"
                      rows={3}
                      maxLength={1000}
                      placeholder="Como você gostaria de viver nesse espaço…"
                    />
                  </>
                )}
              </div>
              <div hidden={premium && step !== 2}>
                <div className="form-two">
                  <div>
                    <label htmlFor="nome">Seu nome</label>
                    <input
                      id="nome"
                      name="nome"
                      autoComplete="name"
                      required
                      disabled={premium && step !== 2}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">E-mail</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      spellCheck={false}
                      required
                      disabled={premium && step !== 2}
                      maxLength={150}
                    />
                  </div>
                </div>
                {!premium && (
                  <>
                    <label htmlFor="mensagem">
                      Conte sua ideia <span>(opcional)</span>
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={3}
                      maxLength={1000}
                    />
                  </>
                )}
                <label className="check-label">
                  <input
                    name="ciencia"
                    type="checkbox"
                    required
                    disabled={premium && step !== 2}
                  />
                  Entendo que este formulário é apenas demonstrativo.
                </label>
              </div>
              <div className="form-actions">
                {premium && step === 2 && (
                  <button
                    className="text-link"
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    ← Voltar
                  </button>
                )}
                <button className="button" type="submit">
                  {premium && step === 1
                    ? "Continuar"
                    : "Concluir demonstração"}
                  <Arrow />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
function Basic() {
  return (
    <div className="basic">
      <VersionBar premium={false} />
      <Header />
      <main id="main">
        <section className="basic-hero frame">
          <div>
            <h1>
              Espaços para
              <br />a sua vida.
            </h1>
            <p>
              Arquitetura residencial e interiores que unem luz natural,
              funcionalidade e o seu jeito de viver.
            </p>
            <ButtonLink to="#contato">Vamos planejar seu espaço</ButtonLink>
          </div>
          <figure>
            <Photo
              name="casa"
              alt="Casa conceitual com jardim, madeira e luz natural"
              priority
            />
            <figcaption>Casa Pátio · Estudo conceitual</figcaption>
          </figure>
        </section>
        <Services />
        <section className="differences">
          <div className="frame section">
            <h2>Projetar com propósito.</h2>
            <div className="difference-grid">
              {[
                [
                  "Escuta de verdade",
                  "Seu cotidiano orienta as escolhas, da distribuição dos ambientes aos pequenos detalhes.",
                ],
                [
                  "Beleza que funciona",
                  "Materiais, luz e circulação pensados para o uso real dos espaços.",
                ],
                [
                  "Decisões com clareza",
                  "Etapas definidas e diálogo para você compreender cada decisão do projeto.",
                ],
              ].map(([title, text]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Intro />
        <Contact />
      </main>
      <Footer basic />
    </div>
  );
}
function Premium() {
  return (
    <div className="premium">
      <VersionBar premium />
      <Header premium />
      <main id="main">
        <section className="premium-hero">
          <div className="frame hero-heading">
            <h1>
              A luz desenha.
              <br />
              Você habita.
            </h1>
            <div>
              <p>
                Arquitetura residencial e interiores para espaços que acolhem a
                vida real.
              </p>
              <ButtonLink to="#projetos">Explore os projetos</ButtonLink>
            </div>
          </div>
          <figure className="hero-photo">
            <Photo
              name="casa"
              alt="Estudo conceitual de casa brasileira aberta para um jardim iluminado"
              priority
            />
            <figcaption>Casa Pátio · Projeto conceitual</figcaption>
          </figure>
        </section>
        <Intro />
        <Portfolio />
        <Services premium />
        <Method />
        <Contact premium />
        <section className="closing frame section">
          <h2>
            Há lugar para
            <br />a sua próxima ideia.
          </h2>
          <ButtonLink to="#contato">Começar uma conversa</ButtonLink>
        </section>
      </main>
      <Footer />
    </div>
  );
}
function Home() {
  return (
    <div className="showcase">
      <Header home />
      <main id="main">
        <section className="showcase-hero frame">
          <div>
            <h1>
              Uma marca.
              <br />
              Três experiências.
            </h1>
            <p>
              O mesmo estúdio de arquitetura.
              <br />
              Três maneiras de construir sua presença digital.
            </p>
          </div>
          <div className="showcase-intro">
            <p>
              Do essencial bem resolvido à direção de arte cinematográfica. Veja
              como design e interação mudam a forma de apresentar uma marca.
            </p>
            <a className="text-link" href="#comparar">
              Encontre a diferença <Arrow />
            </a>
          </div>
        </section>
        <section id="comparar" className="frame comparison">
          <h2 className="sr-only">Compare as landing pages</h2>
          <div className="comparison-grid">
            {[
              {
                type: "Básica",
                route: "/basica",
                image: "preview-basica",
                title: "O essencial, bem pensado.",
                text: "Uma apresentação clara, profissional e direta. Para uma presença digital consistente, sem complexidade.",
                items: [
                  "Navegação objetiva",
                  "Serviços e apresentação",
                  "Contato demonstrativo",
                ],
              },
              {
                type: "Premium",
                route: "/premium",
                image: "preview-premium",
                title: "Uma presença que fica.",
                text: "Direção de arte própria, narrativa editorial e interações que convidam a explorar cada detalhe.",
                items: [
                  "Portfólio interativo",
                  "Composição editorial",
                  "Orçamento em etapas",
                ],
              },
              {
                type: "Super Premium",
                route: "/super-premium",
                image: "preview-super-premium",
                title: "Uma experiência para sentir.",
                text: "Fotografia monumental, narrativa em movimento e uma galeria espacial. Uma presença que convida a ir além.",
                items: [
                  "Parallax cinematográfico",
                  "Galeria em profundidade",
                  "Exploração de materiais",
                ],
              },
            ].map((v) => (
              <article
                key={v.type}
                className={`comparison-option ${v.type === "Premium" ? "premium-option" : ""} ${v.type === "Super Premium" ? "super-option" : ""}`}
              >
                <Link
                  to={v.route}
                  className="preview-link"
                  aria-label={`Abrir Landing Page ${v.type}`}
                >
                  <div className="browser-preview">
                    <div className="browser-chrome">
                      <span aria-hidden="true">● ● ●</span>
                      <span>lume.arquitetura / {v.type.toLowerCase()}</span>
                      <Arrow diagonal />
                    </div>
                    <img
                      src={`${import.meta.env.BASE_URL}images/${v.image}.webp`}
                      alt={`Prévia da landing page ${v.type}`}
                      width="1440"
                      height="1000"
                      fetchPriority="high"
                    />
                  </div>
                  <span className="preview-hover">
                    Explorar experiência <Arrow diagonal />
                  </span>
                </Link>
                <div className="comparison-text">
                  <div className="comparison-heading">
                    <h3>{v.type}</h3>
                    <Link
                      to={v.route}
                      className="round-link"
                      aria-label={`Explorar ${v.type}`}
                    >
                      <Arrow diagonal />
                    </Link>
                  </div>
                  <h4>{v.title}</h4>
                  <p>{v.text}</p>
                  <ul>
                    {v.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  <Link className="button" to={v.route}>
                    Explorar {v.type.toLowerCase()}
                    <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="frame section comparison-details">
          <div>
            <h2>
              O que muda
              <br />
              na prática?
            </h2>
            <p>
              Qualidade nas três versões.
              <br />A diferença está na profundidade da experiência.
            </p>
          </div>
          <div className="table-wrap" role="region" aria-label="Tabela comparativa das três experiências" tabIndex={0}>
            <table>
              <caption className="sr-only">
                Comparação dos recursos implementados
              </caption>
              <thead>
                <tr>
                  <th scope="col">Recurso</th>
                  <th scope="col">Básica</th>
                  <th scope="col">Premium</th>
                  <th scope="col">Super Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Design",
                    "Limpo e consistente",
                    "Editorial e personalizado",
                    "Direção artística cinematográfica",
                  ],
                  [
                    "Conteúdo",
                    "Apresentação direta",
                    "Narrativa e projetos",
                    "Sete capítulos visuais",
                  ],
                  [
                    "Interações",
                    "Navegação e contato",
                    "Filtros, detalhes e etapas",
                    "Galeria espacial e materiais",
                  ],
                  [
                    "Animações",
                    "Discretas",
                    "Revelações e microinterações",
                    "Parallax e sequências GSAP",
                  ],
                  [
                    "Responsividade",
                    "Desktop, tablet e celular",
                    "Desktop, tablet e celular",
                    "Composições adaptadas por tela",
                  ],
                  [
                    "Acessibilidade",
                    "Foco e semântica",
                    "Foco, semântica e diálogos",
                    "Teclado, toque e movimento reduzido",
                  ],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">
                          {cell}
                        </th>
                      ) : (
                        <td key={i}>{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="showcase-note frame">
          <h2>Um showcase honesto.</h2>
          <p>
            Lume Arquitetura é uma empresa fictícia criada para este portfólio.
            Os projetos são conceituais, as imagens são geradas por IA e os
            formulários não enviam dados. Explore livremente.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
function PageBehavior() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const pathname = location.pathname.replace(/\/$/, "");
    document.title = `${pathname === "/super-premium" ? "Super Premium" : pathname === "/premium" ? "Premium" : pathname === "/basica" ? "Básica" : "Showcase"} — Lume Arquitetura`;
  }, [location.pathname]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.07 },
    );
    document
      .querySelectorAll(
        ".section h2, .section h3, .section figure, .section .statement, .project, .method li, .studio img",
      )
      .forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [location.pathname, location.search]);
  return null;
}
export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PageBehavior />
      <div id="top" />
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basica" element={<Basic />} />
        <Route path="/premium" element={<Premium />} />
        <Route
          path="/super-premium"
          element={
            <Suspense
              fallback={
                <main id="main" className="frame section" role="status">
                  Abrindo a experiência Lume…
                </main>
              }
            >
              <SuperPremiumPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Header home />
              <main id="main" className="frame section">
                <h1>Página não encontrada.</h1>
                <Link className="button" to="/">
                  Voltar ao showcase <Arrow />
                </Link>
              </main>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
