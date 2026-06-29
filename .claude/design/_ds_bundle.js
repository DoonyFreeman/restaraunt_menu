/* @ds-bundle: {"format":3,"namespace":"ChaiShopperDesignSystem_69d5ad","components":[{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"CeremonyCard","sourcePath":"components/cards/CeremonyCard.jsx"},{"name":"MenuItemCard","sourcePath":"components/cards/MenuItemCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Navbar","sourcePath":"components/layout/Navbar.jsx"}],"sourceHashes":{"components/cards/Card.jsx":"65d7bc6cb2f8","components/cards/CeremonyCard.jsx":"0864c64db525","components/cards/MenuItemCard.jsx":"098ea4cb0fdf","components/core/Button.jsx":"a9b3e19ed5e7","components/core/Input.jsx":"8bd788fa34c9","components/core/Tag.jsx":"e95a9cd4ec59","components/layout/Navbar.jsx":"bf04ab86f82e","ui_kits/website/ceremonies-location.jsx":"dea705fb82bf","ui_kits/website/data.js":"d0719a58f8ea","ui_kits/website/home.jsx":"20bab788faeb","ui_kits/website/menu-locations.jsx":"a8ffb958d4a9","ui_kits/website/reservation.jsx":"3cdf37e81846"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ChaiShopperDesignSystem_69d5ad = window.ChaiShopperDesignSystem_69d5ad || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Base surface card. Dark clay surface, soft shadow, optional hover lift.
 * Compose richer cards (menu, ceremony) on top of this.
 */
function Card({
  children,
  hover = true,
  padded = true,
  style = {},
  ...rest
}) {
  const [over, setOver] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setOver(true),
    onMouseLeave: () => setOver(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: padded ? 'var(--space-4)' : 0,
      boxShadow: hover && over ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
      transform: hover && over ? 'translateY(var(--lift))' : 'translateY(0)',
      transition: 'transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)',
      borderColor: hover && over ? 'var(--border-strong)' : 'var(--border-subtle)',
      overflow: 'hidden',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ChaiShopper Button.
 * primary  — matte gold fill, dark text (default CTA «Забронировать»)
 * secondary— transparent, gold hairline border
 * ghost    — text-only, gold on hover
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 13
    },
    md: {
      padding: '12px 24px',
      fontSize: 15
    },
    lg: {
      padding: '16px 34px',
      fontSize: 17
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    width: fullWidth ? '100%' : 'auto',
    border: '1px solid transparent',
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    letterSpacing: '0.01em',
    lineHeight: 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out), transform var(--dur-fast) var(--ease-out), color var(--dur) var(--ease-out)',
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--text-on-gold)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--accent)',
      borderColor: 'var(--border-gold)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)'
    }
  };
  const hover = {
    primary: e => {
      if (!disabled) e.currentTarget.style.background = 'var(--accent-hover)';
    },
    secondary: e => {
      if (!disabled) {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.color = 'var(--accent-hover)';
      }
    },
    ghost: e => {
      if (!disabled) e.currentTarget.style.color = 'var(--accent)';
    }
  };
  const leave = {
    primary: e => {
      e.currentTarget.style.background = 'var(--accent)';
    },
    secondary: e => {
      e.currentTarget.style.borderColor = 'var(--border-gold)';
      e.currentTarget.style.color = 'var(--accent)';
    },
    ghost: e => {
      e.currentTarget.style.color = 'var(--text-secondary)';
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: as === 'button' ? disabled : undefined,
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseEnter: hover[variant],
    onMouseLeave: leave[variant],
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/CeremonyCard.jsx
try { (() => {
/**
 * Ceremony card: atmospheric photo, name, duration + price meta, CTA.
 * Used on /ceremonies grid and the home "Наши церемонии" section.
 */
function CeremonyCard({
  name,
  description,
  durationMin,
  price,
  image,
  onBook,
  style = {}
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    padded: false,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 220,
      background: image || 'linear-gradient(160deg, #35302A, #15130F)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-bottom)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.04em',
      color: 'var(--text-muted)'
    }
  }, durationMin, " \u043C\u0438\u043D"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: 'var(--text-faint)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--accent)'
    }
  }, price, " \u20BD")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 400,
      fontSize: 24,
      letterSpacing: '-0.01em',
      color: 'var(--text-primary)',
      margin: 0
    }
  }, name), description && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-muted)'
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "sm",
    onClick: onBook
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C"))));
}
Object.assign(__ds_scope, { CeremonyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CeremonyCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Dark-well text input with gold focus ring. */
function Input({
  label,
  hint,
  error,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-secondary)',
      letterSpacing: '0.01em'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      padding: '12px 14px',
      background: 'var(--bg-well)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      border: `1px solid ${error ? 'var(--chili-500)' : focus ? 'var(--accent)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius)',
      outline: 'none',
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'var(--shadow-inset)',
      transition: 'border-color var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)',
      boxSizing: 'border-box',
      ...style
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? 'var(--chili-500)' : 'var(--text-faint)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small label chip. Semantic tones map to menu attributes.
 * tone: veg | spicy | top | neutral | gold
 */
function Tag({
  children,
  tone = 'neutral',
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    veg: {
      color: 'var(--tag-veg-fg)',
      background: 'var(--tag-veg-bg)'
    },
    spicy: {
      color: 'var(--tag-spicy-fg)',
      background: 'var(--tag-spicy-bg)'
    },
    top: {
      color: 'var(--tag-top-fg)',
      background: 'var(--tag-top-bg)'
    },
    gold: {
      color: 'var(--text-on-gold)',
      background: 'var(--accent)'
    },
    neutral: {
      color: 'var(--text-muted)',
      background: 'rgba(255,255,255,0.05)'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 11px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: '0.01em',
      lineHeight: 1,
      ...t,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/cards/MenuItemCard.jsx
try { (() => {
/**
 * Menu dish card: photo on top, name / description / price, attribute tags.
 * `image` is any CSS background value (url(), gradient). Falls back to a warm texture.
 */
function MenuItemCard({
  name,
  description,
  price,
  image,
  tags = [],
  style = {}
}) {
  const toneFor = {
    veg: 'veg',
    spicy: 'spicy',
    top: 'top'
  };
  const labelFor = {
    veg: 'Вегет.',
    spicy: 'Острое',
    top: 'Хит'
  };
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    padded: false,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 168,
      background: image || 'linear-gradient(135deg, #2A2520, #1E1B16)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }
  }, tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      display: 'flex',
      gap: 6
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t,
    tone: toneFor[t] || 'neutral',
    dot: t !== 'top'
  }, labelFor[t] || t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 400,
      fontSize: 20,
      letterSpacing: '-0.01em',
      color: 'var(--text-primary)',
      margin: 0
    }
  }, name), price != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 16,
      color: 'var(--accent)',
      whiteSpace: 'nowrap'
    }
  }, price, " \u20BD")), description && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { MenuItemCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/MenuItemCard.jsx", error: String((e && e.message) || e) }); }

// components/layout/Navbar.jsx
try { (() => {
/** Compact inline teapot mark so the navbar is self-contained in the bundle. */
function Mark({
  size = 30
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 160 160",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M70 40c0-8 8-8 8-16s-8-8-8-16",
    stroke: "var(--accent)",
    strokeWidth: "4",
    strokeLinecap: "round",
    opacity: "0.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M44 86c0-19 16-34 36-34s36 15 36 34c0 6-2 11-5 16H49c-3-5-5-10-5-16Z",
    stroke: "var(--accent)",
    strokeWidth: "5",
    fill: "none",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M80 52v-8",
    stroke: "var(--accent)",
    strokeWidth: "5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "80",
    cy: "42",
    r: "4",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M44 70c-12-2-22 2-28 10",
    stroke: "var(--accent)",
    strokeWidth: "5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M116 66c12 0 18 8 18 18",
    stroke: "var(--accent)",
    strokeWidth: "5",
    strokeLinecap: "round",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 118h60",
    stroke: "var(--accent)",
    strokeWidth: "5",
    strokeLinecap: "round"
  }));
}

/**
 * Translucent dark navbar with backdrop blur. Logo left, nav center/right, CTA right.
 * `links` = [{ label, href, active }]. Pass `transparent` for hero overlays.
 */
function Navbar({
  links = [{
    label: 'Меню',
    href: '/menu'
  }, {
    label: 'Наши точки',
    href: '/locations'
  }, {
    label: 'Церемонии',
    href: '/ceremonies'
  }],
  ctaLabel = 'Забронировать',
  onCta,
  transparent = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: 'var(--navbar-h)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--space-7)',
      background: transparent ? 'transparent' : 'var(--surface-overlay)',
      backdropFilter: transparent ? 'none' : 'blur(14px) saturate(1.1)',
      WebkitBackdropFilter: transparent ? 'none' : 'blur(14px) saturate(1.1)',
      borderBottom: `1px solid ${transparent ? 'transparent' : 'var(--border-subtle)'}`,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement(Mark, null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 22,
      letterSpacing: '-0.02em',
      color: 'var(--text-primary)'
    }
  }, "Chai", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      color: 'var(--accent)'
    }
  }, "Shopper"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    style: {
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: '0.01em',
      color: l.active ? 'var(--accent)' : 'var(--text-secondary)',
      transition: 'color var(--dur) var(--ease-out)'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--accent)',
    onMouseLeave: e => e.currentTarget.style.color = l.active ? 'var(--accent)' : 'var(--text-secondary)'
  }, l.label)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    onClick: onCta
  }, ctaLabel)));
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Navbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ceremonies-location.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ChaiShopper — Ceremonies page & single Location page.
const {
  Button,
  Tag,
  Card,
  MenuItemCard,
  CeremonyCard
} = window.ChaiShopperDesignSystem_69d5ad;
const Dc2 = window.CHAI;
const {
  wrap
} = window.ChaiBits;
const Footer3 = window.ChaiFooter;
const MORE_CEREMONIES = [{
  id: 'sencha',
  name: 'Сэнтя · Зелёный полдень',
  durationMin: 40,
  price: 1600,
  description: 'Лёгкий японский зелёный чай и пауза среди дня.',
  image: 'linear-gradient(160deg,#3f4a39,#14130f)'
}, {
  id: 'milk-oolong',
  name: 'Молочный улун',
  durationMin: 50,
  price: 2100,
  description: 'Сливочные ноты и мягкое тепло в несколько проливов.',
  image: 'linear-gradient(160deg,#4a4030,#15120d)'
}, {
  id: 'night-tie',
  name: 'Те Гуань Инь',
  durationMin: 65,
  price: 2600,
  description: 'Глубокий улун «Железная богиня милосердия».',
  image: 'linear-gradient(160deg,#46372c,#120f0b)'
}];
function CeremoniesScreen({
  go
}) {
  const all = Dc2.ceremonies.concat(MORE_CEREMONIES);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 460,
      display: 'flex',
      alignItems: 'flex-end',
      backgroundImage: 'url(' + Dc2.photos.teapot + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(80% 70% at 75% 25%, rgba(200,169,110,0.10), transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-hero)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      position: 'relative',
      padding: '0 32px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--accent)'
    }
  }, "\u0427\u0430\u0439\u043D\u044B\u0435 \u0446\u0435\u0440\u0435\u043C\u043E\u043D\u0438\u0438"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 64,
      letterSpacing: '-0.02em',
      margin: '16px 0 0',
      maxWidth: 640
    }
  }, "\u0420\u0438\u0442\u0443\u0430\u043B\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0441\u0442\u043E\u0438\u0442 \u043E\u0442\u0434\u0430\u0442\u044C \u0432\u0435\u0447\u0435\u0440"), /*#__PURE__*/React.createElement("p", {
    className: "cs-quote",
    style: {
      marginTop: 20,
      maxWidth: 520
    }
  }, "\xAB\u0422\u0438\u0448\u0438\u043D\u0430 \u043C\u0435\u0436\u0434\u0443 \u0433\u043B\u043E\u0442\u043A\u0430\u043C\u0438 \u2014 \u0442\u043E\u0436\u0435 \u0447\u0430\u0441\u0442\u044C \u0447\u0430\u044F.\xBB"))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '80px 32px 112px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, all.map(c => /*#__PURE__*/React.createElement(CeremonyCard, _extends({
    key: c.id
  }, c, {
    onBook: () => go('reservation')
  }))))), /*#__PURE__*/React.createElement(Footer3, {
    go: go
  }));
}
function LocationPageScreen({
  go,
  param
}) {
  const loc = param || Dc2.locations[0];
  const local = Dc2.menu.slice(0, 3); // local menu subset
  const info = [['Адрес', loc.address], ['Часы', loc.hours], ['Телефон', loc.phone]];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 420,
      display: 'flex',
      alignItems: 'flex-end',
      backgroundImage: 'url(' + Dc2.photos.teapot + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(70% 80% at 70% 20%, rgba(200,169,110,0.10), transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-hero)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      position: 'relative',
      padding: '0 32px 56px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('locations'),
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      cursor: 'pointer',
      padding: 0,
      marginBottom: 18
    }
  }, "\u2190 \u0412\u0441\u0435 \u0442\u043E\u0447\u043A\u0438"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 60,
      letterSpacing: '-0.02em',
      margin: 0
    }
  }, loc.name.replace('ChaiShopper ', '')))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '48px 32px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24,
      borderBottom: '1px solid var(--border-subtle)',
      paddingBottom: 40
    }
  }, info.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      marginBottom: 10
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      color: 'var(--text-secondary)'
    }
  }, v))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '64px 32px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--accent)'
    }
  }, "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 36,
      letterSpacing: '-0.02em',
      margin: '14px 0 32px'
    }
  }, "\u0422\u043E\u043B\u044C\u043A\u043E \u0432 \u044D\u0442\u043E\u0439 \u0442\u043E\u0447\u043A\u0435"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, local.map(m => /*#__PURE__*/React.createElement(MenuItemCard, _extends({
    key: m.id
  }, m))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '80px 32px 112px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    hover: false,
    style: {
      background: 'var(--surface-card)',
      padding: 40,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 34,
      letterSpacing: '-0.02em',
      margin: 0
    }
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u043E\u043B"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 16,
      color: 'var(--text-muted)',
      maxWidth: 420,
      margin: '12px auto 0'
    }
  }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \u0438 \u0432\u0440\u0435\u043C\u044F \u2014 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442 \u0431\u0440\u043E\u043D\u044C \u0432 \u044D\u0442\u043E\u0439 \u0442\u043E\u0447\u043A\u0435."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => go('reservation')
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C")))), /*#__PURE__*/React.createElement(Footer3, {
    go: go
  }));
}
window.CeremoniesScreen = CeremoniesScreen;
window.LocationPageScreen = LocationPageScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ceremonies-location.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// Mock content for the ChaiShopper website UI kit. Real atmospheric photos
// (free Unsplash, downloaded into assets/) for hero + dim-sum; warm gradients elsewhere.
const PH = '../../assets/photo-teapot-dark.jpg';
const PG = '../../assets/photo-gyoza-dark.jpg';
window.CHAI = {
  photos: {
    teapot: PH,
    gyoza: PG
  },
  ceremonies: [{
    id: 'gongfu',
    name: 'Гунфу Ча',
    durationMin: 60,
    price: 2400,
    description: 'Классическая церемония пролива — внимание к каждому настою улуна.',
    image: 'linear-gradient(180deg, rgba(20,15,12,0.30), rgba(20,15,12,0.62)), url(' + PH + ')'
  }, {
    id: 'matcha',
    name: 'Тядо · Матча',
    durationMin: 45,
    price: 1900,
    description: 'Взбивание маття венчиком тясэн в тишине и неспешности.',
    image: 'linear-gradient(160deg,#3a4636,#15130f)'
  }, {
    id: 'puer',
    name: 'Вечерний Пуэр',
    durationMin: 75,
    price: 2800,
    description: 'Глубокий выдержанный чай для медленного завершения дня.',
    image: 'linear-gradient(160deg,#43332a,#120f0c)'
  }],
  categories: [{
    id: 'all',
    name: 'Всё'
  }, {
    id: 'tea',
    name: 'Чай'
  }, {
    id: 'hot',
    name: 'Горячее'
  }, {
    id: 'dim',
    name: 'Дим-сам'
  }, {
    id: 'sweet',
    name: 'Десерты'
  }],
  menu: [{
    id: 1,
    cat: 'tea',
    name: 'Улун с горным мёдом',
    price: 480,
    tags: ['veg', 'top'],
    description: 'Полуферментированный чай с тёплыми нотами и долгим послевкусием.',
    image: 'linear-gradient(150deg,#6b5b4e,#2a2520)'
  }, {
    id: 2,
    cat: 'tea',
    name: 'Маття церемониальная',
    price: 520,
    tags: ['veg'],
    description: 'Каменный помол, насыщенный умами и мягкая горчинка.',
    image: 'linear-gradient(150deg,#5d6b4e,#222a20)'
  }, {
    id: 3,
    cat: 'dim',
    name: 'Хар Гао с креветкой',
    price: 590,
    tags: ['top'],
    description: 'Полупрозрачное тесто, сочная начинка, подача на пару.',
    image: 'url(' + PG + ')'
  }, {
    id: 4,
    cat: 'hot',
    name: 'Лапша Дан-Дан',
    price: 640,
    tags: ['spicy'],
    description: 'Пшеничная лапша, кунжутный соус и сычуаньский перец.',
    image: 'linear-gradient(150deg,#7a4f3e,#2a1a14)'
  }, {
    id: 5,
    cat: 'dim',
    name: 'Баоцзы с уткой',
    price: 560,
    tags: [],
    description: 'Пышные паровые булочки с томлёной уткой и хойсин.',
    image: 'url(' + PG + ')'
  }, {
    id: 6,
    cat: 'sweet',
    name: 'Моти с кунжутом',
    price: 380,
    tags: ['veg', 'top'],
    description: 'Рисовое тесто и чёрный кунжут — мягкий, тягучий десерт.',
    image: 'linear-gradient(150deg,#5a5048,#1f1b16)'
  }],
  locations: [{
    id: 'pokrovka',
    name: 'ChaiShopper на Покровке',
    slug: 'pokrovka',
    address: 'Покровка, 12, Москва',
    hours: 'Пн–Вс · 10:00–23:00',
    phone: '+7 495 120-44-10',
    x: 62,
    y: 40
  }, {
    id: 'patriki',
    name: 'ChaiShopper на Патриках',
    slug: 'patriki',
    address: 'Малая Бронная, 24, Москва',
    hours: 'Пн–Вс · 09:00–24:00',
    phone: '+7 495 120-44-12',
    x: 38,
    y: 33
  }, {
    id: 'gorky',
    name: 'ChaiShopper в Парке Горького',
    slug: 'gorky',
    address: 'Крымский Вал, 9, Москва',
    hours: 'Пн–Вс · 11:00–22:00',
    phone: '+7 495 120-44-15',
    x: 51,
    y: 64
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ChaiShopper website screens. Composes design-system primitives from the bundle.
const {
  Navbar,
  Button,
  Tag,
  Card,
  MenuItemCard,
  CeremonyCard,
  Input
} = window.ChaiShopperDesignSystem_69d5ad;
const D = window.CHAI;

/* ── Shared bits ─────────────────────────────────────────── */
function Eyebrow({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--accent)'
    }
  }, children);
}
function SectionHead({
  eyebrow,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 640,
      margin: '0 auto 56px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 40,
      letterSpacing: '-0.02em',
      margin: '16px 0 0',
      color: 'var(--text-primary)'
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--text-muted)'
    }
  }, sub));
}
const wrap = {
  maxWidth: 1240,
  margin: '0 auto',
  padding: '0 32px'
};
function Footer({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-raised)',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '64px 32px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 48,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 300
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 24,
      letterSpacing: '-0.02em'
    }
  }, "Chai", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontWeight: 400
    }
  }, "Shopper")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 14,
      lineHeight: 1.7,
      color: 'var(--text-faint)'
    }
  }, "\u0413\u043E\u0440\u043E\u0434\u0441\u043A\u0430\u044F \u0430\u0437\u0438\u0430\u0442\u0441\u043A\u0430\u044F \u0447\u0430\u0439\u043D\u0430\u044F. \u0418\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u043E \u0447\u0430\u0439\u043D\u043E\u0439 \u043F\u0430\u0443\u0437\u044B \u2014 \u0432 \u0446\u0435\u043D\u0442\u0440\u0435 \u0433\u043E\u0440\u043E\u0434\u0430.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 64,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(FootCol, {
    title: "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F",
    links: [['Меню', 'menu'], ['Наши точки', 'locations'], ['Церемонии', 'home'], ['Бронирование', 'reservation']],
    go: go
  }), /*#__PURE__*/React.createElement(FootCol, {
    title: "\u0422\u043E\u0447\u043A\u0438",
    links: D.locations.map(l => [l.name.replace('ChaiShopper ', ''), 'locations']),
    go: go
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      marginBottom: 16
    }
  }, "\u0421\u043E\u0446\u0441\u0435\u0442\u0438"), ['Telegram', 'Instagram', 'VK'].map(s => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginBottom: 10
    }
  }, s))))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '0 32px 40px',
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, "\xA9 2026 ChaiShopper. \u0421\u0434\u0435\u043B\u0430\u043D\u043E \u0441 \u0442\u0438\u0448\u0438\u043D\u043E\u0439."));
}
function FootCol({
  title,
  links,
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      marginBottom: 16
    }
  }, title), links.map(([label, dest], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => go(dest),
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      marginBottom: 10,
      cursor: 'pointer'
    }
  }, label)));
}

/* ── Home ────────────────────────────────────────────────── */
function HomeScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 'calc(100vh - 76px)',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(100deg, rgba(15,14,12,0.97) 0%, rgba(15,14,12,0.84) 40%, rgba(15,14,12,0.45) 72%, rgba(15,14,12,0.7) 100%), url(' + D.photos.teapot + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0427\u0430\u0439\u043D\u0430\u044F \u0446\u0435\u0440\u0435\u043C\u043E\u043D\u0438\u044F \u0432 \u0433\u043E\u0440\u043E\u0434\u0435"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 76,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: '20px 0 0',
      color: 'var(--text-primary)'
    }
  }, "\u0418\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u043E", /*#__PURE__*/React.createElement("br", null), "\u0447\u0430\u0439\u043D\u043E\u0439 \u043F\u0430\u0443\u0437\u044B"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      maxWidth: 460
    }
  }, "\u0422\u0451\u043F\u043B\u044B\u0439 \u0441\u0432\u0435\u0442, \u043F\u0430\u0440 \u043D\u0430\u0434 \u0447\u0430\u0448\u043A\u043E\u0439 \u0438 \u043D\u0435\u0441\u043F\u0435\u0448\u043D\u044B\u0439 \u0440\u0438\u0442\u0443\u0430\u043B. \u041C\u0435\u0441\u0442\u043E, \u0433\u0434\u0435 \u0432\u0440\u0435\u043C\u044F \u0437\u0430\u043C\u0435\u0434\u043B\u044F\u0435\u0442\u0441\u044F."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => go('reservation')
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u043E\u043B"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => go('menu')
  }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043C\u0435\u043D\u044E"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '112px 32px'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "\u041D\u0430\u0448\u0438 \u0446\u0435\u0440\u0435\u043C\u043E\u043D\u0438\u0438",
    title: "\u0420\u0438\u0442\u0443\u0430\u043B\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0441\u0442\u043E\u0438\u0442 \u043E\u0442\u0434\u0430\u0442\u044C \u0432\u0435\u0447\u0435\u0440",
    sub: "\u0422\u0440\u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u0430 \u0437\u0430\u043C\u0435\u0434\u043B\u0438\u0442\u044C\u0441\u044F \u2014 \u043E\u0442 \u043A\u043B\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u0440\u043E\u043B\u0438\u0432\u0430 \u0443\u043B\u0443\u043D\u0430 \u0434\u043E \u0432\u0437\u0431\u0438\u0442\u043E\u0439 \u043C\u0430\u0442\u0442\u044F."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, D.ceremonies.map(c => /*#__PURE__*/React.createElement(CeremonyCard, _extends({
    key: c.id
  }, c, {
    onBook: () => go('reservation')
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '0 32px 112px'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0435 \u043C\u0435\u043D\u044E",
    title: "\u0422\u043E, \u0447\u0442\u043E \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 20
    }
  }, D.menu.filter(m => m.tags.includes('top')).concat(D.menu.filter(m => !m.tags.includes('top'))).slice(0, 4).map(m => /*#__PURE__*/React.createElement(MenuItemCard, _extends({
    key: m.id
  }, m)))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go('menu')
  }, "\u0412\u0441\u0451 \u043C\u0435\u043D\u044E \u2192"))), /*#__PURE__*/React.createElement(Footer, {
    go: go
  }));
}
window.HomeScreen = HomeScreen;
window.ChaiFooter = Footer;
window.ChaiBits = {
  Eyebrow,
  SectionHead,
  wrap
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/menu-locations.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ChaiShopper — Menu & Locations screens.
const {
  Button,
  Tag,
  Card,
  MenuItemCard
} = window.ChaiShopperDesignSystem_69d5ad;
const Dm = window.CHAI;
const {
  wrap
} = window.ChaiBits;
const Footer2 = window.ChaiFooter;

/* ── Menu ────────────────────────────────────────────────── */
function MenuScreen({
  go
}) {
  const [cat, setCat] = React.useState('all');
  const [loc, setLoc] = React.useState(Dm.locations[0]);
  const [open, setOpen] = React.useState(false);
  const items = cat === 'all' ? Dm.menu : Dm.menu.filter(m => m.cat === cat);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '56px 32px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--accent)'
    }
  }, "\u041C\u0435\u043D\u044E"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 24,
      flexWrap: 'wrap',
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 52,
      letterSpacing: '-0.02em',
      margin: 0
    }
  }, "\u0427\u0430\u0439 \u0438 \u043A\u0443\u0445\u043D\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius)',
      padding: '11px 16px',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)'
    }
  }, "\u0420\u0435\u0441\u0442\u043E\u0440\u0430\u043D:"), " ", loc.name.replace('ChaiShopper ', ''), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "\u25BE")), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      right: 0,
      minWidth: 260,
      background: 'var(--surface-card-hover)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-overlay)',
      overflow: 'hidden',
      zIndex: 20
    }
  }, Dm.locations.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    onClick: () => {
      setLoc(l);
      setOpen(false);
    },
    style: {
      padding: '13px 16px',
      cursor: 'pointer',
      borderBottom: '1px solid var(--border-subtle)',
      color: l.id === loc.id ? 'var(--accent)' : 'var(--text-secondary)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500
    }
  }, l.name.replace('ChaiShopper ', '')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-faint)',
      marginTop: 3
    }
  }, l.address))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 76,
      zIndex: 10,
      background: 'var(--surface-overlay)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--border-subtle)',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '14px 32px',
      display: 'flex',
      gap: 10
    }
  }, Dm.categories.map(c => {
    const on = c.id === cat;
    return /*#__PURE__*/React.createElement("button", {
      key: c.id,
      onClick: () => setCat(c.id),
      style: {
        padding: '9px 18px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        background: on ? 'var(--accent)' : 'transparent',
        color: on ? 'var(--text-on-gold)' : 'var(--text-secondary)',
        border: `1px solid ${on ? 'var(--accent)' : 'var(--border-subtle)'}`,
        transition: 'all var(--dur) var(--ease-out)'
      }
    }, c.name);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '40px 32px 100px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, items.map(m => /*#__PURE__*/React.createElement(MenuItemCard, _extends({
    key: m.id
  }, m))))), /*#__PURE__*/React.createElement(Footer2, {
    go: go
  }));
}

/* ── Locations ───────────────────────────────────────────── */
function Marker({
  active
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "40",
    height: "52",
    viewBox: "0 0 84 110",
    fill: "none",
    style: {
      filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.5))',
      transition: 'transform var(--dur) var(--ease-out)',
      transform: active ? 'scale(1.18)' : 'scale(1)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M42 4C22 4 6 19 6 39c0 25 30 58 35 64 1 1 3 1 4 0 5-6 35-39 35-64C80 19 64 4 42 4Z",
    fill: active ? '#D4BA83' : '#C8A96E',
    stroke: "#0F0E0C",
    strokeOpacity: "0.3",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "#0F0E0C",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M24 44c0-10 8-18 18-18s18 8 18 18c0 3-1 6-3 8H27c-2-2-3-5-3-8Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M24 38c-6-1-11 1-14 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 36c6 0 9 4 9 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M42 26v-4"
  })));
}
function LocationsScreen({
  go
}) {
  const [sel, setSel] = React.useState(Dm.locations[0]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: 'calc(100vh - 76px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      flexShrink: 0,
      borderRight: '1px solid var(--border-subtle)',
      padding: '40px 32px',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--accent)'
    }
  }, "\u041D\u0430\u0448\u0438 \u0442\u043E\u0447\u043A\u0438"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 40,
      letterSpacing: '-0.02em',
      margin: '14px 0 28px'
    }
  }, "\u0413\u0434\u0435 \u043D\u0430\u0439\u0442\u0438 \u0442\u0438\u0448\u0438\u043D\u0443"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, Dm.locations.map(l => {
    const on = l.id === sel.id;
    return /*#__PURE__*/React.createElement("div", {
      key: l.id,
      onClick: () => setSel(l),
      style: {
        padding: 18,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        background: on ? 'var(--surface-card-hover)' : 'var(--surface-card)',
        border: `1px solid ${on ? 'var(--border-gold)' : 'var(--border-subtle)'}`,
        transition: 'all var(--dur) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 20,
        color: 'var(--text-primary)'
      }
    }, l.name.replace('ChaiShopper ', '')), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: 'var(--text-muted)',
        marginTop: 8
      }
    }, l.address), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-faint)',
        marginTop: 4
      }
    }, l.hours), on && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        display: 'flex',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      onClick: e => {
        e.stopPropagation();
        go('location', l);
      }
    }, "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      onClick: e => {
        e.stopPropagation();
        go('reservation');
      }
    }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C")));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: 'relative',
      background: 'radial-gradient(110% 90% at 50% 30%, #1a1712, #0c0b09)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.5,
      backgroundImage: 'linear-gradient(rgba(200,169,110,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.05) 1px, transparent 1px)',
      backgroundSize: '64px 64px'
    }
  }), Dm.locations.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    onClick: () => setSel(l),
    style: {
      position: 'absolute',
      left: `${l.x}%`,
      top: `${l.y}%`,
      transform: 'translate(-50%,-100%)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Marker, {
    active: l.id === sel.id
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${sel.x}%`,
      top: `${sel.y}%`,
      transform: 'translate(-50%, 14px)',
      width: 260
    }
  }, /*#__PURE__*/React.createElement(Card, {
    hover: false,
    style: {
      background: 'var(--surface-card-hover)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 18
    }
  }, sel.name.replace('ChaiShopper ', '')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, sel.address), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-faint)',
      marginTop: 3
    }
  }, sel.phone), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    onClick: () => go('location', sel)
  }, "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435"))))));
}
window.MenuScreen = MenuScreen;
window.LocationsScreen = LocationsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/menu-locations.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/reservation.jsx
try { (() => {
// ChaiShopper — Reservation stepped flow.
const {
  Button,
  Input
} = window.ChaiShopperDesignSystem_69d5ad;
const Dr = window.CHAI;
function Stepper({
  step,
  labels
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0,
      marginBottom: 40
    }
  }, labels.map((lb, i) => {
    const done = i < step,
      cur = i === step;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        width: 64
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: 600,
        background: cur ? 'var(--accent)' : done ? 'rgba(200,169,110,0.18)' : 'transparent',
        color: cur ? 'var(--text-on-gold)' : done ? 'var(--accent)' : 'var(--text-faint)',
        border: `1px solid ${cur || done ? 'var(--border-gold)' : 'var(--border-subtle)'}`
      }
    }, done ? '✓' : i + 1), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: cur ? 'var(--text-secondary)' : 'var(--text-faint)',
        textAlign: 'center'
      }
    }, lb)), i < labels.length - 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: '0 0 28px',
        height: 1,
        background: i < step ? 'var(--border-gold)' : 'var(--border-subtle)',
        marginTop: -18
      }
    }));
  }));
}
function ReservationScreen({
  go
}) {
  const labels = ['Точка', 'Дата', 'Гости', 'Контакты', 'Готово'];
  const [step, setStep] = React.useState(0);
  const [f, setF] = React.useState({
    loc: null,
    date: '',
    time: '19:00',
    guests: 2,
    name: '',
    phone: '',
    email: ''
  });
  const set = (k, v) => setF(p => ({
    ...p,
    [k]: v
  }));
  const next = () => setStep(s => Math.min(s + 1, 4));
  const back = () => setStep(s => Math.max(s - 1, 0));
  const times = ['12:00', '14:00', '16:00', '18:00', '19:00', '20:00', '21:00'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 'calc(100vh - 76px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      background: 'radial-gradient(100% 80% at 50% 0%, rgba(200,169,110,0.06), transparent 60%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 560,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-overlay)',
      padding: 40
    }
  }, /*#__PURE__*/React.createElement(Stepper, {
    step: step,
    labels: labels
  }), step === 0 && /*#__PURE__*/React.createElement(Field, {
    title: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0435\u0441\u0442\u043E\u0440\u0430\u043D"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, Dr.locations.map(l => {
    const on = f.loc && f.loc.id === l.id;
    return /*#__PURE__*/React.createElement("div", {
      key: l.id,
      onClick: () => set('loc', l),
      style: {
        padding: 16,
        borderRadius: 'var(--radius)',
        cursor: 'pointer',
        background: on ? 'var(--surface-card-hover)' : 'var(--bg-well)',
        border: `1px solid ${on ? 'var(--border-gold)' : 'var(--border-subtle)'}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 18
      }
    }, l.name.replace('ChaiShopper ', '')), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        marginTop: 4
      }
    }, l.address));
  }))), step === 1 && /*#__PURE__*/React.createElement(Field, {
    title: "\u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F"
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u0414\u0430\u0442\u0430",
    type: "date",
    value: f.date,
    onChange: e => set('date', e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-secondary)',
      marginBottom: 10
    }
  }, "\u0412\u0440\u0435\u043C\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9,
      flexWrap: 'wrap'
    }
  }, times.map(t => {
    const on = t === f.time;
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: () => set('time', t),
      style: {
        padding: '9px 15px',
        borderRadius: 'var(--radius)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        background: on ? 'var(--accent)' : 'transparent',
        color: on ? 'var(--text-on-gold)' : 'var(--text-secondary)',
        border: `1px solid ${on ? 'var(--accent)' : 'var(--border-subtle)'}`
      }
    }, t);
  }))), step === 2 && /*#__PURE__*/React.createElement(Field, {
    title: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0433\u043E\u0441\u0442\u0435\u0439?"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 28,
      padding: '12px 0'
    }
  }, /*#__PURE__*/React.createElement(Round, {
    onClick: () => set('guests', Math.max(1, f.guests - 1))
  }, "\u2212"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 64,
      fontWeight: 300,
      minWidth: 90,
      textAlign: 'center'
    }
  }, f.guests), /*#__PURE__*/React.createElement(Round, {
    onClick: () => set('guests', Math.min(20, f.guests + 1))
  }, "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: 13,
      color: 'var(--text-faint)'
    }
  }, "\u043E\u0442 1 \u0434\u043E 20 \u0433\u043E\u0441\u0442\u0435\u0439")), step === 3 && /*#__PURE__*/React.createElement(Field, {
    title: "\u0412\u0430\u0448\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u0418\u043C\u044F",
    placeholder: "\u041A\u0430\u043A \u0432\u0430\u0441 \u0437\u043E\u0432\u0443\u0442",
    value: f.name,
    onChange: e => set('name', e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
    placeholder: "+7 ___ ___-__-__",
    value: f.phone,
    onChange: e => set('phone', e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    value: f.email,
    onChange: e => set('email', e.target.value)
  }))), step === 4 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '12px 0 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      margin: '0 auto 22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(200,169,110,0.15)',
      border: '1px solid var(--border-gold)',
      color: 'var(--accent)',
      fontSize: 30
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 34,
      letterSpacing: '-0.02em',
      margin: 0
    }
  }, "\u0421\u0442\u043E\u043B \u0437\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      maxWidth: 380,
      margin: '14px auto 0'
    }
  }, f.loc ? f.loc.name.replace('ChaiShopper ', '') : 'Покровка', " \xB7 ", f.date || 'сегодня', " \u0432 ", f.time, " \xB7 ", f.guests, " ", f.guests === 1 ? 'гость' : 'гостей', ". \u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442 \u0431\u0440\u043E\u043D\u044C \u0438 \u043F\u0440\u0438\u0448\u043B\u0451\u0442 \u043F\u0438\u0441\u044C\u043C\u043E \u043D\u0430 ", f.email || 'вашу почту', "."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => go('home')
  }, "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E"))), step < 4 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: step === 0 ? () => go('home') : back
  }, step === 0 ? 'Отмена' : '← Назад'), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: next,
    disabled: step === 0 && !f.loc
  }, step === 3 ? 'Подтвердить' : 'Далее'))));
}
function Field({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 26,
      letterSpacing: '-0.02em',
      margin: '0 0 22px',
      textAlign: 'center'
    }
  }, title), children);
}
function Round({
  children,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      cursor: 'pointer',
      background: 'var(--bg-well)',
      border: '1px solid var(--border-subtle)',
      color: 'var(--accent)',
      fontSize: 24,
      lineHeight: 1
    }
  }, children);
}
window.ReservationScreen = ReservationScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/reservation.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CeremonyCard = __ds_scope.CeremonyCard;

__ds_ns.MenuItemCard = __ds_scope.MenuItemCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Navbar = __ds_scope.Navbar;

})();
