# Brand direction

The user removed the yarn/thread theme on 2026-09-09. Keep the website's simple
editorial layout. Do not reintroduce yarn backgrounds, central yarn scenes,
scroll-controlled video, thread dividers, or yarn-themed copy unless the user
explicitly requests a new direction.

Yarn remains only in the static brand mark. The user selected Google's existing
monochrome Noto Emoji yarn design (Unicode U+1F9F6), replacing the custom mark.
The vector is the original Regular 400 glyph outline, extracted from the official
variable font. Its geometry is unchanged apart from normalization to a square
viewBox. No full font download is needed by the website.

- Source: https://github.com/google/fonts/tree/main/ofl/notoemoji
- Font: NotoEmoji[wght].ttf, Regular 400, glyph `yarn`.
- License: SIL Open Font License 1.1, retained at public/brand/NOTO-OFL.txt.
- Primary logo: public/brand/yarn-mark.svg, black #111111.
- Dark-surface logo: public/brand/yarn-mark-light.svg, white #FFFFFF.
- Browser icons: app/icon.svg and app/favicon.ico.

The mark has a transparent background. The visible site name supplies the
accessible logo label. The website uses this mark in its header and footer.

The old animation experiments and generated media remain outside the project
at ~/Archive/aisafety-yarn-exploration-2026-09-09. They are not website assets.

## Typography and wordmark

The user selected Helvetica as the main website font. Body text, headings,
controls, and the wordmark use Helvetica, then Helvetica Neue, Arial, and a
system sans-serif fallback. The site does not bundle a proprietary font file.
Inter and Newsreader imports have been removed.

The visible text logo is exactly “AISSS”, in bold Helvetica with tight tracking,
to the right of the Noto yarn icon. `BrandLogo.tsx` shares the lockup between
the header and footer. Its accessible name remains “AI Safety Said Simply”.

## Industrial monochrome — 2026-09-10

The current direction is industrial, professional minimalism: white surfaces,
black type, neutral gray secondary text, Helvetica throughout, square controls,
and thin rules. Use consistent alignment for structure, without numbered section labels.
The yarn icon remains a static monochrome brand mark beside AISSS.
Keep photographs in their original full color. Do not add colored interface accents, decorative textures,
gradients, or animations. Preserve the existing content and routes.

## Full-screen hero and open sections — 2026-09-10

Remove horizontal divider rules from the navigation, sections, and FAQ rows.
The hero occupies the first screen beneath the navigation, with an oversized
Helvetica headline and generous space. Keep library entries separate with space
instead of a bordered table. Retain necessary form and filter outlines.

## Library status color — 2026-09-10

The user selected orange for live library cards and light gray for in-production
cards. This is an intentional exception to the monochrome interface palette.
Omit visible status words; retain accessible status text for screen readers.

## Google feedback form

Contact feedback renders native fields on the website and submits through
`/api/feedback` to the published Google Form. The Google iframe stayed blank in
the in-app preview, so it is not used. A direct Google Form link remains as a fallback. The source form is AI Safety Said Simply (Feedback) in the
user-selected AI Safety Said Simply Drive folder. Name and email are optional;
feedback is required. The form is published and does not expose response summaries.

Editor: https://docs.google.com/forms/d/1AH95p-s7_zN1IGlxcCPqw6LXXrsMUNEv2iLgHPthCsQ/edit
Folder: https://drive.google.com/drive/u/0/folders/1IvHd0I2AbSX4daR6VutvwHYQtzhdflvJ

The server maps the name, email, and feedback fields to the Google Form entry IDs.
Success requires Google's visible confirmation message; failures preserve the
visitor's text. One labeled "Website integration test" response verified receipt
in Google Forms. Keep the confirmation message in sync if the form is edited.


## Team expression of interest

Replaced the Communications and Policy tabs with one Join our team form. Required fields: name, email, and contribution interest. Optional fields: relevant links and availability. The native form submits through `/api/team-interest` to the Google Form in the shared Drive folder, with a direct Google Form fallback.

Editor: https://docs.google.com/forms/d/14-Xn_bJ7bkyjamfOmpTmSZMSFEEm7qEsMy5BB_IFblY/edit

Respondent: https://docs.google.com/forms/d/e/1FAIpQLSfI143yyq1QOhyMCH-bKztpuIgBT7RITbxr9H5QyI7bargH1Q/viewform
