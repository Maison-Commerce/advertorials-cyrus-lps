// Pixel-perfect spec — expected computed values straight from Figma.
// Add a block here whenever a new section is built.
//
// style values: string = exact match, RegExp = test, {approx,tol} = numeric±tol
// rect values:  use {approx, tol} (px). Colors are computed rgb()/rgba().

const PRIMARY = "rgb(48, 48, 48)"; // #303030
const BLACK = "rgb(0, 0, 0)";
const CYAN = "rgb(1, 151, 178)"; // #0197b2
const ALBERT = /Albert Sans/;
const RALEWAY = /Raleway/;
const POPPINS = /Poppins/;

export default {
  appPath: "lp2/index.html",
  viewports: {
    desktop: { width: 1440, height: 2600, deviceScaleFactor: 1 },
    mobile: { width: 375, height: 3200, deviceScaleFactor: 1 },
  },
  checks: [
    // ---------------- Header ----------------
    {
      name: "Header bar",
      viewport: "desktop",
      selector: ".site-header",
      style: {
        backgroundColor: /^rgba\(1, 151, 178, 0\.0?2\)$/,
        borderBottomWidth: "1px",
        borderBottomColor: "rgb(223, 223, 223)",
      },
    },
    {
      name: "Header brand",
      viewport: "desktop",
      selector: ".site-header__brand",
      style: {
        fontFamily: /Helvetica/,
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: "25.2px", // 18 × 1.4
        color: BLACK,
      },
    },
    {
      name: "Header disclaimer",
      viewport: "desktop",
      selector: ".site-header__disclaimer",
      style: {
        fontFamily: ALBERT,
        fontSize: "12px",
        lineHeight: "18px", // 12 × 1.5
        color: PRIMARY,
        textDecorationLine: "underline",
      },
    },
    {
      name: "Header logo container (centered, padded)",
      viewport: "desktop",
      selector: ".site-header__logo-container",
      style: { paddingLeft: "120px", paddingRight: "120px" },
    },
    {
      name: "Header logo container (mobile padding)",
      viewport: "mobile",
      selector: ".site-header__logo-container",
      style: { paddingLeft: "16px", paddingRight: "16px" },
    },

    // ---------------- Content column ----------------
    {
      name: "Content column width (desktop 850)",
      viewport: "desktop",
      selector: ".content__inner",
      style: { paddingTop: "20px" },
      rect: { width: { approx: 850, tol: 1 } },
    },
    {
      // Full-bleed 375 with 16px insets ⇒ 343 content area (matches Figma).
      name: "Content column insets (mobile → 343 content)",
      viewport: "mobile",
      selector: ".content__inner",
      style: { paddingLeft: "16px", paddingRight: "16px" },
      rect: { width: { approx: 375, tol: 1 } },
    },

    // ---------------- Hero (desktop) ----------------
    {
      name: "Hero stack gap",
      viewport: "desktop",
      selector: ".hero",
      style: { rowGap: "20px" },
    },
    {
      name: "Hero head gap",
      viewport: "desktop",
      selector: ".hero__head",
      style: { rowGap: "12px" },
    },
    {
      name: "Hero title (desktop H1)",
      viewport: "desktop",
      selector: ".hero__title",
      style: {
        fontFamily: ALBERT,
        fontWeight: "700",
        fontSize: "40px",
        lineHeight: "48px", // 40 × 1.2
        color: PRIMARY,
      },
    },
    {
      name: "Hero subtitle (desktop)",
      viewport: "desktop",
      selector: ".hero__subtitle",
      style: {
        fontWeight: "400",
        fontSize: "20px",
        lineHeight: "30px", // 20 × 1.5
        color: PRIMARY,
      },
    },
    {
      name: "Hero author row gap",
      viewport: "desktop",
      selector: ".hero__author",
      style: { columnGap: "16px" },
    },
    {
      name: "Hero avatar (desktop 60px)",
      viewport: "desktop",
      selector: ".hero__avatar",
      style: { borderTopLeftRadius: "999px" },
      rect: { width: { approx: 60, tol: 0.5 }, height: { approx: 60, tol: 0.5 } },
    },
    {
      name: "Hero byline",
      viewport: "desktop",
      selector: ".hero__byline",
      style: { fontSize: "14px", lineHeight: "21px", whiteSpace: "nowrap" },
    },
    {
      name: "Hero role (italic)",
      viewport: "desktop",
      selector: ".hero__role",
      style: { fontStyle: "italic", fontSize: "14px" },
    },
    {
      name: "Hero media (desktop 850×364)",
      viewport: "desktop",
      selector: ".hero__media",
      rect: { width: { approx: 850, tol: 1 }, height: { approx: 364, tol: 1.5 } },
    },

    // ---------------- Hero (mobile) ----------------
    {
      name: "Hero title (mobile H4)",
      viewport: "mobile",
      selector: ".hero__title",
      style: { fontSize: "24px", lineHeight: "33.6px" }, // 24 × 1.4
    },
    {
      name: "Hero subtitle (mobile)",
      viewport: "mobile",
      selector: ".hero__subtitle",
      style: { fontSize: "18px", lineHeight: "27px" },
    },
    {
      name: "Hero avatar (mobile 48px)",
      viewport: "mobile",
      selector: ".hero__avatar",
      rect: { width: { approx: 48, tol: 0.5 }, height: { approx: 48, tol: 0.5 } },
    },
    {
      name: "Hero byline wraps (mobile)",
      viewport: "mobile",
      selector: ".hero__byline",
      style: { whiteSpace: "normal" },
    },
    {
      name: "Hero byline break visible (mobile)",
      viewport: "mobile",
      selector: ".hero__byline-break",
      style: { display: "inline" },
    },
    {
      name: "Hero media (mobile 343×142)",
      viewport: "mobile",
      selector: ".hero__media",
      rect: { width: { approx: 343, tol: 1 }, height: { approx: 142, tol: 1.5 } },
    },

    // ---------------- Intro ----------------
    {
      name: "Intro stack gap + top margin",
      viewport: "desktop",
      selector: ".intro",
      style: { rowGap: "24px", marginTop: "32px" },
    },
    {
      name: "Intro lead paragraph (Raleway + black)",
      viewport: "desktop",
      selector: ".intro__p--lead",
      style: {
        fontFamily: RALEWAY,
        fontSize: "18px",
        lineHeight: "27px",
        color: BLACK,
      },
    },
    {
      name: "Intro body paragraph (Albert Sans)",
      viewport: "desktop",
      selector: ".intro__p:not(.intro__p--lead):not(.intro__p--bold)",
      style: {
        fontFamily: ALBERT,
        fontWeight: "400",
        fontSize: "18px",
        lineHeight: "27px",
        color: PRIMARY,
      },
    },

    // ---------------- Divider ----------------
    {
      name: "Divider (2px #EDEDED, 32px above)",
      viewport: "desktop",
      selector: ".divider",
      style: {
        borderTopWidth: "2px",
        borderTopStyle: "solid",
        borderTopColor: "rgb(237, 237, 237)",
        marginTop: "32px",
      },
      rect: { height: { approx: 2, tol: 0.5 } },
    },

    // ---------------- Section heading (How We Ranked) ----------------
    {
      name: "Section heading stack (gap 20, top 32)",
      viewport: "desktop",
      selector: ".section-heading",
      style: { rowGap: "20px", marginTop: "32px" },
    },
    {
      name: "Section heading title (cyan H, desktop)",
      viewport: "desktop",
      selector: ".section-heading__title",
      style: {
        fontFamily: ALBERT,
        fontWeight: "700",
        fontSize: "32px",
        lineHeight: "41.6px", // 32 × 1.3
        color: "rgb(1, 151, 178)",
      },
    },
    {
      name: "Section heading lead (bold)",
      viewport: "desktop",
      selector: ".section-heading__lead",
      style: {
        fontFamily: ALBERT,
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: "27px",
        color: PRIMARY,
      },
    },
    {
      name: "Section heading title (mobile line-height 1.2)",
      viewport: "mobile",
      selector: ".section-heading__title",
      style: { fontSize: "32px", lineHeight: "38.4px" }, // 32 × 1.2
    },

    // ---------------- Criteria (six key things) ----------------
    {
      name: "Criteria list (gap 24, top 32, no bullets)",
      viewport: "desktop",
      selector: ".criteria",
      style: {
        rowGap: "24px",
        marginTop: "32px",
        listStyleType: "none",
        paddingLeft: "0px",
        fontFamily: ALBERT,
        fontSize: "18px",
        lineHeight: "27px",
        color: PRIMARY,
      },
    },
    {
      name: "Criteria item base (regular)",
      viewport: "desktop",
      selector: ".criteria__item",
      style: { fontWeight: "400", fontSize: "18px" },
    },
    {
      name: "Criteria item label (bold)",
      viewport: "desktop",
      selector: ".criteria__item strong",
      style: { fontWeight: "700" },
    },

    // ---------------- Listicle title + Card #1 ----------------
    {
      name: "Listicle title (cyan H, top 32)",
      viewport: "desktop",
      selector: ".listicle__title",
      style: {
        fontFamily: ALBERT,
        fontWeight: "700",
        fontSize: "32px",
        lineHeight: "41.6px",
        color: CYAN,
      },
    },
    {
      name: "Card shell (bg, padding, gap)",
      viewport: "desktop",
      selector: ".card",
      style: {
        backgroundColor: "rgb(232, 232, 232)",
        paddingTop: "20px",
        paddingLeft: "20px",
        rowGap: "32px",
      },
    },
    {
      name: "Card title (underlined H4)",
      viewport: "desktop",
      selector: ".card__title",
      style: {
        fontFamily: ALBERT,
        fontWeight: "700",
        fontSize: "32px",
        lineHeight: "41.6px",
        color: PRIMARY,
        textDecorationLine: "underline",
      },
    },
    {
      name: "Card subtitle (italic)",
      viewport: "desktop",
      selector: ".card__subtitle",
      style: { fontStyle: "italic", fontSize: "20px", lineHeight: "30px" },
    },
    {
      name: "Card medal (96px)",
      viewport: "desktop",
      selector: ".card__medal",
      rect: { width: { approx: 96 }, height: { approx: 96 } },
    },
    {
      name: "Stat box (256px square)",
      viewport: "desktop",
      selector: ".card__stat--image",
      rect: { width: { approx: 256 }, height: { approx: 256 } },
    },
    {
      name: "Stat label (Raleway cyan 26)",
      viewport: "desktop",
      selector: ".card__stat-label",
      style: {
        fontFamily: RALEWAY,
        fontSize: "26px",
        lineHeight: "26px",
        color: CYAN,
      },
    },
    {
      name: "Grade A+ (Poppins 72 cyan)",
      viewport: "desktop",
      selector: ".card__grade",
      style: {
        fontFamily: POPPINS,
        fontWeight: "700",
        fontSize: "72px",
        lineHeight: "72px",
        color: CYAN,
      },
    },
    {
      name: "Rating score (Poppins 50 cyan)",
      viewport: "desktop",
      selector: ".card__rating-score",
      style: {
        fontFamily: POPPINS,
        fontWeight: "700",
        fontSize: "50px",
        color: CYAN,
      },
    },
    {
      name: "Stars (Poppins 30 gold)",
      viewport: "desktop",
      selector: ".card__stars",
      style: {
        fontFamily: POPPINS,
        fontSize: "30px",
        color: "rgb(246, 191, 88)",
      },
    },
    {
      name: "Offer text (semibold italic 16)",
      viewport: "desktop",
      selector: ".card__offer-text",
      style: { fontWeight: "600", fontStyle: "italic", fontSize: "16px" },
    },
    {
      name: "CTA button (gold pill)",
      viewport: "desktop",
      selector: ".btn-cta",
      style: {
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "32.4px", // 18 × 1.8
        borderRadius: "5px",
        color: PRIMARY,
        backgroundImage: /linear-gradient/,
      },
    },
    {
      name: "Score bar track (#eee)",
      viewport: "desktop",
      selector: ".score__track",
      style: { backgroundColor: "rgb(238, 238, 238)" },
    },
    {
      name: "Score bar fill (green, 24px)",
      viewport: "desktop",
      selector: ".score__fill",
      style: { backgroundColor: "rgb(106, 168, 79)" },
      rect: { height: { approx: 24 } },
    },
    {
      name: "Score label (bold 18)",
      viewport: "desktop",
      selector: ".score__label",
      style: { fontWeight: "700", fontSize: "18px" },
    },
    {
      name: "PROS title (green 20)",
      viewport: "desktop",
      selector: ".card__pros .card__verdict-title",
      style: { fontWeight: "700", fontSize: "20px", color: "rgb(20, 198, 73)" },
    },
    {
      name: "CONS title (red 20)",
      viewport: "desktop",
      selector: ".card__cons .card__verdict-title",
      style: { fontWeight: "700", fontSize: "20px", color: "rgb(208, 2, 27)" },
    },
    {
      name: "Verdict bullet (32px)",
      viewport: "desktop",
      selector: ".card__bullet",
      rect: { width: { approx: 32 }, height: { approx: 32 } },
    },
    {
      name: "Card hairline rule (1px #cfcfcf)",
      viewport: "desktop",
      selector: ".card__rule",
      style: { borderTopWidth: "1px", borderTopColor: "rgb(207, 207, 207)" },
    },
    {
      name: "Medal hidden on desktop? (visible)",
      viewport: "desktop",
      selector: ".card__medal",
      style: { display: "block" },
    },
    {
      name: "Grade line hidden on desktop",
      viewport: "desktop",
      selector: ".card__grade-line",
      style: { display: "none" },
    },

    // ---------------- Card #1 — mobile ----------------
    {
      name: "Medal hidden on mobile",
      viewport: "mobile",
      selector: ".card__medal",
      style: { display: "none" },
    },
    {
      name: "Grade line shown (Raleway bold 26 cyan)",
      viewport: "mobile",
      selector: ".card__grade-line",
      style: {
        display: "block",
        fontFamily: RALEWAY,
        fontWeight: "700",
        fontSize: "26px",
        color: CYAN,
      },
    },
    {
      name: "Grade stat column hidden on mobile",
      viewport: "mobile",
      selector: ".card__stat--grade",
      style: { display: "none" },
    },
    {
      name: "Stat box 180px tall on mobile",
      viewport: "mobile",
      selector: ".card__stat--image",
      rect: { height: { approx: 180 } },
    },
    {
      name: "Rating numerals smaller on mobile",
      viewport: "mobile",
      selector: ".card__rating-score",
      style: { fontSize: "32px", lineHeight: "32px" },
    },
    {
      name: "Rating label smaller on mobile",
      viewport: "mobile",
      selector: ".card__stat-label",
      style: { fontSize: "20px", lineHeight: "20px" },
    },
    {
      name: "Stars smaller on mobile",
      viewport: "mobile",
      selector: ".card__stars",
      style: { fontSize: "20px" },
    },
    {
      name: "Score row stacks on mobile",
      viewport: "mobile",
      selector: ".score",
      style: { flexDirection: "column" },
    },
    {
      name: "Score meter inline on mobile",
      viewport: "mobile",
      selector: ".score__meter",
      style: { flexDirection: "row" },
    },

    // ---------------- Card #2 — non-winner variations ----------------
    {
      name: "Card #2 title NOT underlined",
      viewport: "desktop",
      selector: ".card:not(.card--winner) .card__title",
      style: { textDecorationLine: "none", fontSize: "32px" },
    },
    {
      name: "Card #2 grade is dark (not cyan)",
      viewport: "desktop",
      selector: ".card:not(.card--winner) .card__grade",
      style: { fontFamily: POPPINS, fontSize: "72px", color: PRIMARY },
    },
    {
      name: "Card #2 rating is dark",
      viewport: "desktop",
      selector: ".card:not(.card--winner) .card__rating-score",
      style: { color: PRIMARY },
    },
    {
      name: "Card #2 stat label is dark",
      viewport: "desktop",
      selector: ".card:not(.card--winner) .card__stat-label",
      style: { color: PRIMARY },
    },
    {
      name: "Empty star is grey #c2c2c2",
      viewport: "desktop",
      selector: ".card__stars-off",
      style: { color: "rgb(194, 194, 194)" },
    },
    {
      name: "Card #2 grade-line dark on mobile",
      viewport: "mobile",
      selector: ".card:not(.card--winner) .card__grade-line",
      style: { display: "block", color: PRIMARY },
    },

    // ---------------- Section heading: Why True Nutra (regular lead) ----------------
    {
      name: "Why-True-Nutra title (cyan H)",
      viewport: "desktop",
      selector: ".section-heading__title >> nth=1",
      style: { fontFamily: ALBERT, fontWeight: "700", fontSize: "32px", color: CYAN },
    },
    {
      name: "Why-True-Nutra lead is REGULAR",
      viewport: "desktop",
      selector: ".section-heading__lead--regular",
      style: { fontWeight: "400", fontSize: "18px", lineHeight: "27px", color: PRIMARY },
    },

    // ---------------- Why-details + Buying Guide ----------------
    {
      name: "Why-details wrapper (gap 20, top 32)",
      viewport: "desktop",
      selector: ".why-details",
      style: { rowGap: "20px", marginTop: "32px" },
    },
    {
      name: "Why-list flush (no top margin)",
      viewport: "desktop",
      selector: ".criteria--flush",
      style: { marginTop: "0px", rowGap: "24px" },
    },
    {
      name: "Guide title bar (#efefef, bold 24)",
      viewport: "desktop",
      selector: ".guide__title",
      style: {
        backgroundColor: "rgb(239, 239, 239)",
        fontWeight: "700",
        fontSize: "24px",
        lineHeight: "33.6px",
        color: PRIMARY,
      },
    },
    {
      name: "Guide GOOD box (green bg, gap 24, pad 20)",
      viewport: "desktop",
      selector: ".guide__box--good",
      style: {
        backgroundColor: "rgb(217, 234, 211)",
        rowGap: "24px",
        paddingTop: "20px",
        fontSize: "18px",
      },
    },
    {
      name: "Guide BAD box (red bg)",
      viewport: "desktop",
      selector: ".guide__box--bad",
      style: { backgroundColor: "rgb(244, 204, 204)" },
    },
    {
      name: "Guide heading bold 18",
      viewport: "desktop",
      selector: ".guide__heading",
      style: { fontWeight: "700", fontSize: "18px" },
    },

    // ---------------- Subsection (dark H5 + body) ----------------
    {
      name: "Subsection wrapper (gap 20, top 32)",
      viewport: "desktop",
      selector: ".subsection",
      style: { rowGap: "20px", marginTop: "32px" },
    },
    {
      name: "Subsection title (dark bold 24)",
      viewport: "desktop",
      selector: ".subsection__title",
      style: {
        fontFamily: ALBERT,
        fontWeight: "700",
        fontSize: "24px",
        lineHeight: "33.6px",
        color: PRIMARY,
      },
    },
    {
      name: "Subsection body (regular 18, gap 24)",
      viewport: "desktop",
      selector: ".subsection__body",
      style: { fontWeight: "400", fontSize: "18px", lineHeight: "27px", rowGap: "24px" },
    },

    // ---------------- Offer (Special Offer CTA) ----------------
    {
      name: "Offer wrapper (gap 20, top 32)",
      viewport: "desktop",
      selector: ".offer",
      style: { rowGap: "20px", marginTop: "32px" },
    },
    {
      name: "Offer title (cyan bold 32)",
      viewport: "desktop",
      selector: ".offer__title",
      style: { fontFamily: ALBERT, fontWeight: "700", fontSize: "32px", color: CYAN },
    },
    {
      name: "Offer list (gap 12, no bullets)",
      viewport: "desktop",
      selector: ".offer__list",
      style: { rowGap: "12px", listStyleType: "none", paddingLeft: "0px", fontSize: "18px" },
    },
    {
      name: "Offer CTA present on desktop",
      viewport: "desktop",
      selector: ".offer .btn-cta",
      style: { fontWeight: "600", fontSize: "18px", borderRadius: "5px" },
    },
    {
      name: "Offer CTA present on MOBILE (designer omitted it)",
      viewport: "mobile",
      selector: ".offer .btn-cta",
      style: { display: "flex", fontSize: "18px" },
    },

    // ---------------- Top Pick (dashed highlight box) ----------------
    {
      name: "Top-pick box (cream bg, 3px dashed midnight border)",
      viewport: "desktop",
      selector: ".top-pick",
      style: {
        backgroundColor: "rgb(255, 252, 237)",
        borderTopWidth: "3px",
        borderTopStyle: "dashed",
        borderTopColor: "rgb(3, 49, 103)",
        columnGap: "20px",
        marginTop: "32px",
      },
    },
    {
      name: "Top-pick image (240×390 desktop)",
      viewport: "desktop",
      selector: ".top-pick__image",
      rect: { width: { approx: 240 }, height: { approx: 390 } },
    },
    {
      name: "Top-pick title (bold 24)",
      viewport: "desktop",
      selector: ".top-pick__title",
      style: { fontFamily: ALBERT, fontWeight: "700", fontSize: "24px", color: PRIMARY },
    },
    {
      name: "Top-pick list (gap 12, no bullets)",
      viewport: "desktop",
      selector: ".top-pick__list",
      style: { rowGap: "12px", listStyleType: "none" },
    },
    {
      name: "Top-pick check icon (24px)",
      viewport: "desktop",
      selector: ".top-pick__check",
      rect: { width: { approx: 24 }, height: { approx: 24 } },
    },
    {
      name: "Top-pick stacks on mobile",
      viewport: "mobile",
      selector: ".top-pick",
      style: { flexDirection: "column" },
    },
    {
      name: "Top-pick image shorter on mobile (264)",
      viewport: "mobile",
      selector: ".top-pick__image",
      rect: { height: { approx: 264 } },
    },
    {
      name: "Top-pick CTA no side padding on mobile (fits one line)",
      viewport: "mobile",
      selector: ".top-pick .btn-cta",
      style: { paddingLeft: "0px", paddingRight: "0px" },
    },

    // ---------------- Footer ----------------
    {
      name: "Footer bar (#f0f0f0)",
      viewport: "desktop",
      selector: ".site-footer",
      style: { backgroundColor: "rgb(240, 240, 240)" },
    },
    {
      name: "Footer inner (gap 20, pad 40/120)",
      viewport: "desktop",
      selector: ".site-footer__inner",
      style: { rowGap: "20px", paddingTop: "40px", paddingLeft: "120px" },
    },
    {
      name: "Footer brand (Helvetica bold 18)",
      viewport: "desktop",
      selector: ".site-footer__brand",
      style: { fontFamily: /Helvetica/, fontWeight: "700", fontSize: "18px", color: BLACK },
    },
    {
      name: "Footer disclaimer (italic 14 navy)",
      viewport: "desktop",
      selector: ".site-footer__disclaimer p",
      style: {
        fontStyle: "italic",
        fontSize: "14px",
        lineHeight: "21px",
        color: "rgb(30, 37, 56)",
      },
    },
    {
      name: "Footer link (underlined #303030)",
      viewport: "desktop",
      selector: ".site-footer__link",
      style: { color: PRIMARY, textDecorationLine: "underline" },
    },
    {
      name: "Footer logo mark (32px)",
      viewport: "desktop",
      selector: ".site-footer__logo-mark",
      rect: { width: { approx: 32 } },
    },
    {
      name: "Footer inner padding on mobile (16)",
      viewport: "mobile",
      selector: ".site-footer__inner",
      style: { paddingLeft: "16px", paddingRight: "16px" },
    },
  ],
};
