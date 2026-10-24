# Resume publishing

The resume page uses the shared app theme. Its professional text comes from the
approved Google Docs resume; the web header uses the requested LinkedIn headline.
The web portrait is the same original image used on the portfolio homepage.

Three native Google Docs PDF exports are published:

- `public/matthew-clark-resume.pdf`: white paper, dark text, readable accents.
- `public/matthew-clark-resume-dark.pdf`: Dark Modern charcoal and exact syntax colors.
- `public/matthew-clark-resume-regular.pdf`: monochrome text and MC mark on white.

| Role | Dark PDF | Light PDF |
| --- | --- | --- |
| Background | #1F1F1F | #FFFFFF |
| Body | #CCCCCC | #1F1F1F |
| Links / blue accent | #9CDCFE | #0069B9 |
| Magenta accent | #C586C0 | #8A397E |
| Yellow accent | #DCDCAA | #70651A |
| Salmon accent | #CE9178 | #9B4D32 |
| Rules | #454545 | #D4D4D4 |

The PDF content, typography, native links, margins, and two-page layout are
preserved from the source document. Apply colors without rewriting text or
flattening the native structure. Export each version, compare extracted text
with the source export, and render and inspect every page before replacing files.
The native Dark, Light, and Regular documents are maintained in the Drive Brand Library. Each uses Arial and an MC header mark; Regular uses a monochrome mark. The initially empty Light document was populated with the same approved career content.

Each PDF has an explicit Download link and an Open link. Open links launch the
same exported PDF in a new tab, where the browser PDF viewer provides printing.
The Regular monochrome variant also has explicit Download and Open actions.

Keep the stable light-PDF filename for existing links. Public resume navigation
and profile cards should link to `/resume/` so both downloads stay discoverable.
