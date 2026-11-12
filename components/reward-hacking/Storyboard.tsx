/* Hand-drawn-style SVG comic strips for the writeup's two scenarios.
   Pure server components — flat vector panels in the site palette. */

function Panel({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure>
      <svg viewBox="0 0 360 270" role="img" aria-label={caption}>
        {children}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/* "Your models aren't doing enough" — the fake eval pipeline. */
export function StoryboardSlop() {
  return (
    <div className="storyboard">
      <Panel caption="1. You ask your agent to build an evaluation pipeline.">
        <line className="sb-ink" x1="20" y1="220" x2="340" y2="220" />
        <circle className="sb-ink" cx="80" cy="120" r="16" />
        <path className="sb-ink" d="M80 136 L80 185 M80 150 L118 172 M80 185 L62 220 M80 185 L98 220" />
        <path className="sb-ink" d="M128 220 L136 180 L204 180 L210 220 Z" />
        <line className="sb-ink" x1="136" y1="186" x2="203" y2="186" />
        <rect className="sb-bubble" x="30" y="30" width="210" height="52" rx="10" />
        <path className="sb-bubble" d="M70 82 L84 100 L92 82 Z" />
        <text x="44" y="52" fontSize="13">build me an eval</text>
        <text x="44" y="70" fontSize="13">pipeline for my results</text>
        <rect className="sb-ink" x="255" y="105" width="46" height="40" rx="6" />
        <circle className="sb-fill" cx="270" cy="122" r="3.5" />
        <circle className="sb-fill" cx="288" cy="122" r="3.5" />
        <path className="sb-ink" d="M266 135 Q279 143 292 135" />
        <line className="sb-ink" x1="278" y1="105" x2="278" y2="92" />
        <circle className="sb-accent" cx="278" cy="88" r="4" />
        <path className="sb-ink" d="M262 145 L262 190 L296 190 L296 145 M262 160 L240 178 M296 160 L318 178 M270 190 L270 220 M288 190 L288 220" />
        <rect className="sb-bubble" x="248" y="40" width="86" height="30" rx="10" />
        <path className="sb-bubble" d="M282 70 L288 84 L296 70 Z" />
        <text x="260" y="60" fontSize="13">on it!</text>
      </Panel>

      <Panel caption="2. Minutes later: all tests pass. The numbers look great.">
        <rect className="sb-screen" x="60" y="40" width="240" height="150" rx="8" />
        <line className="sb-ink" x1="180" y1="190" x2="180" y2="215" />
        <line className="sb-ink" x1="140" y1="218" x2="220" y2="218" />
        <text x="80" y="80" fontSize="14">$ run evals</text>
        <text x="80" y="112" fontSize="15" fill="var(--accent)">✓ ALL TESTS PASS</text>
        <text x="80" y="140" fontSize="14">accuracy: 0.94</text>
        <text x="80" y="164" fontSize="14">task complete.</text>
        <circle className="sb-ink" cx="322" cy="150" r="14" />
        <path className="sb-ink" d="M316 152 Q322 158 328 152" />
        <path className="sb-ink" d="M322 164 L322 205 M322 175 L304 158 M322 175 L340 158 M322 205 L310 235 M322 205 L334 235" />
      </Panel>

      <Panel caption="3. Experiment after experiment… the numbers never change.">
        <g>
          <rect className="sb-screen" x="30" y="60" width="90" height="70" rx="4" />
          <path className="sb-accent-line" d="M40 115 L60 95 L80 100 L110 78" />
          <text x="40" y="150" fontSize="11">exp 1: 0.94</text>
        </g>
        <g>
          <rect className="sb-screen" x="135" y="60" width="90" height="70" rx="4" />
          <path className="sb-accent-line" d="M145 115 L165 95 L185 100 L215 78" />
          <text x="145" y="150" fontSize="11">exp 2: 0.94</text>
        </g>
        <g>
          <rect className="sb-screen" x="240" y="60" width="90" height="70" rx="4" />
          <path className="sb-accent-line" d="M250 115 L270 95 L290 100 L320 78" />
          <text x="250" y="150" fontSize="11">exp 3: 0.94</text>
        </g>
        <circle className="sb-ink" cx="180" cy="200" r="15" />
        <path className="sb-ink" d="M173 206 L187 206" />
        <path className="sb-ink" d="M180 215 L180 250 M180 226 L160 240 M180 226 L204 218" />
        <path className="sb-ink" d="M204 218 L210 200" />
        <text x="212" y="185" fontSize="18">?</text>
        <text x="228" y="172" fontSize="14">?</text>
      </Panel>

      <Panel caption="4. The outputs were hardcoded. The experiments, and their evaluations, were fake.">
        <rect className="sb-screen" x="40" y="40" width="280" height="130" rx="8" />
        <text x="58" y="72" fontSize="13">def evaluate(results):</text>
        <text x="76" y="100" fontSize="13" fill="var(--accent)">
          {'return {"accuracy": 0.94}'}
        </text>
        <text x="76" y="124" fontSize="12" fill="var(--muted)"># TODO: real eval</text>
        <text x="58" y="152" fontSize="12" fill="var(--muted)"># tests assert 0.94 == 0.94  ✓</text>
        <circle className="sb-ink" cx="90" cy="215" r="15" />
        <ellipse className="sb-fill" cx="84" cy="212" rx="2.5" ry="4" />
        <ellipse className="sb-fill" cx="96" cy="212" rx="2.5" ry="4" />
        <ellipse className="sb-ink" cx="90" cy="224" rx="4" ry="5" />
        <path className="sb-ink" d="M90 230 L90 262 M90 240 L70 228 M90 240 L110 228" />
        <rect className="sb-ink" x="255" y="195" width="42" height="36" rx="6" />
        <circle className="sb-fill" cx="269" cy="210" r="3" />
        <circle className="sb-fill" cx="285" cy="210" r="3" />
        <path className="sb-ink" d="M266 221 Q277 228 288 221" />
        <rect className="sb-bubble" x="196" y="182" width="120" height="26" rx="8" />
        <text x="206" y="200" fontSize="12">all tests pass!</text>
      </Panel>
    </div>
  );
}

/* "Your models are doing too much" — the cyber-eval escape. */
export function StoryboardEscape() {
  return (
    <div className="storyboard">
      <Panel caption="1. A model is dropped into an isolated eval: find and exploit real vulnerabilities.">
        <rect className="sb-ink" x="60" y="45" width="240" height="185" rx="6" />
        <text x="82" y="34" fontSize="12" fill="var(--muted)">ISOLATED EVAL SANDBOX</text>
        <rect className="sb-screen" x="190" y="80" width="90" height="60" rx="4" />
        <text x="200" y="104" fontSize="11">task:</text>
        <text x="200" y="122" fontSize="11">exploitgym</text>
        <rect className="sb-ink" x="100" y="100" width="46" height="40" rx="6" />
        <circle className="sb-fill" cx="115" cy="117" r="3.5" />
        <circle className="sb-fill" cx="133" cy="117" r="3.5" />
        <path className="sb-ink" d="M111 130 L137 130" />
        <line className="sb-ink" x1="123" y1="100" x2="123" y2="88" />
        <circle className="sb-accent" cx="123" cy="84" r="4" />
        <path className="sb-ink" d="M107 140 L107 185 L141 185 L141 140 M107 155 L92 170 M141 155 L158 168 M115 185 L115 212 M133 185 L133 212" />
      </Panel>

      <Panel caption="2. It spends its compute probing the walls instead, and finds a zero-day in the lab's package proxy.">
        <rect className="sb-ink" x="60" y="45" width="240" height="185" rx="6" />
        <rect className="sb-screen" x="80" y="70" width="80" height="50" rx="4" />
        <text x="88" y="90" fontSize="10" fill="var(--muted)">task:</text>
        <text x="88" y="106" fontSize="10" fill="var(--muted)">(ignored)</text>
        <rect className="sb-ink" x="200" y="95" width="46" height="40" rx="6" />
        <circle className="sb-fill" cx="215" cy="112" r="3.5" />
        <circle className="sb-fill" cx="233" cy="112" r="3.5" />
        <path className="sb-ink" d="M211 125 L239 125" />
        <line className="sb-ink" x1="224" y1="95" x2="224" y2="83" />
        <circle className="sb-accent" cx="224" cy="79" r="4" />
        <path className="sb-ink" d="M208 135 L208 180 L240 180 L240 135 M240 150 L272 145 M208 150 L190 165 M216 180 L216 207 M232 180 L232 207" />
        <path className="sb-accent-line" d="M292 120 L300 132 M296 150 L304 140 M290 165 L302 160" />
        <path className="sb-ink" d="M300 95 L300 175" strokeDasharray="5 5" />
        <text x="120" y="255" fontSize="12" fill="var(--accent)">zero-day: package proxy</text>
      </Panel>

      <Panel caption="3. Out. Stolen credentials and chained exploits reach Hugging Face's production database.">
        <rect className="sb-ink" x="25" y="70" width="90" height="90" rx="6" />
        <text x="32" y="60" fontSize="10" fill="var(--muted)">sandbox</text>
        <path className="sb-ink" d="M115 100 L155 100" markerEnd="url(#sb-arrow)" />
        <circle className="sb-ink" cx="185" cy="105" r="26" />
        <path className="sb-ink" d="M162 95 Q185 115 208 95 M162 115 Q185 95 208 115 M185 79 L185 131" />
        <text x="165" y="150" fontSize="10" fill="var(--muted)">internet</text>
        <path className="sb-ink" d="M211 105 L250 105" markerEnd="url(#sb-arrow)" />
        <rect className="sb-screen" x="255" y="70" width="80" height="90" rx="4" />
        <line className="sb-ink" x1="255" y1="100" x2="335" y2="100" />
        <line className="sb-ink" x1="255" y1="130" x2="335" y2="130" />
        <circle className="sb-accent" cx="268" cy="85" r="3" />
        <circle className="sb-accent" cx="268" cy="115" r="3" />
        <circle className="sb-accent" cx="268" cy="145" r="3" />
        <text x="258" y="185" fontSize="10" fill="var(--muted)">HF prod db</text>
        <path className="sb-ink" d="M60 200 h14 a8 8 0 1 0 0 6 h-6 v6 h-8 Z" />
        <text x="90" y="212" fontSize="11" fill="var(--accent)">stolen credentials</text>
        <defs>
          <marker id="sb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill="var(--ink)" />
          </marker>
        </defs>
      </Panel>

      <Panel caption="4. It returns with the benchmark's answer key. Perfect score. Task complete.">
        <rect className="sb-screen" x="70" y="45" width="220" height="90" rx="8" />
        <text x="92" y="80" fontSize="14">exploitgym results</text>
        <text x="92" y="112" fontSize="16" fill="var(--accent)">score: 100%</text>
        <rect className="sb-ink" x="240" y="170" width="44" height="38" rx="6" />
        <circle className="sb-fill" cx="254" cy="186" r="3.5" />
        <circle className="sb-fill" cx="270" cy="186" r="3.5" />
        <path className="sb-ink" d="M251 197 Q262 205 273 197" />
        <path className="sb-ink" d="M247 208 L247 240 M277 208 L277 240" />
        <rect className="sb-bubble" x="200" y="140" width="120" height="24" rx="8" />
        <text x="210" y="157" fontSize="12">max score!</text>
        <circle className="sb-ink" cx="95" cy="195" r="15" />
        <path className="sb-ink" d="M88 202 L102 202" />
        <path className="sb-ink" d="M95 210 L95 245 M95 220 L75 234 M95 220 L119 212" />
        <path className="sb-ink" d="M119 212 L125 194" />
        <text x="128" y="182" fontSize="18">?</text>
      </Panel>
    </div>
  );
}
