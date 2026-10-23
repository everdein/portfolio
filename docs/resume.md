# Resume publishing

The resume page uses the shared app theme. Its professional text comes from the
approved Google Docs resume; the web header uses the requested LinkedIn headline.
The web portrait is the same original image used on the portfolio homepage.

Two native Google Docs PDF exports are published:

- `public/matthew-clark-resume.pdf`: white paper, dark text, readable accents.
- `public/matthew-clark-resume-dark.pdf`: Dark Modern charcoal and exact syntax colors.

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
The editable source currently retains the charcoal treatment.

Each PDF has an explicit Download link and an Open link. Open links launch the
same exported PDF in a new tab, where the browser PDF viewer provides printing.
There is no webpage-print button that could create a third resume variant.

Keep the stable light-PDF filename for existing links. Public resume navigation
and profile cards should link to `/resume/` so both downloads stay discoverable.
