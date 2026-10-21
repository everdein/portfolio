"""Build the public resume PDF; render separately for visual QA.

Run from the portfolio root. No private contact details or employer data belong
in this public artifact. Review the rendered pages before replacing the PDF.
"""
from pathlib import Path
from html import escape
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, PageBreak

styles = {
    'Normal': ParagraphStyle('Normal', fontName='Helvetica', fontSize=10.5, leading=13.4, spaceAfter=6),
    'Title': ParagraphStyle('Title', fontName='Helvetica-Bold', fontSize=23, leading=27, spaceAfter=7),
    'Heading 1': ParagraphStyle('Heading 1', fontName='Helvetica-Bold', fontSize=12, leading=16, spaceBefore=9, spaceAfter=6, keepWithNext=True),
    'Heading 2': ParagraphStyle('Heading 2', fontName='Helvetica-Bold', fontSize=10.5, leading=14, spaceBefore=6, spaceAfter=4, keepWithNext=True),
    'List Bullet': ParagraphStyle('List Bullet', fontName='Helvetica', fontSize=10.5, leading=13.4, leftIndent=10, firstLineIndent=0, bulletIndent=0, spaceAfter=6),
    'Role detail': ParagraphStyle('Role detail', fontName='Helvetica', fontSize=10, leading=13, spaceAfter=6, keepWithNext=True),
}
story = []

class Resume:
    def add_heading(self, text, level=1):
        paragraph(text, f'Heading {level}')
    def add_page_break(self):
        story.append(PageBreak())

document = Resume()

def paragraph(text, style=None):
    story.append(Paragraph(escape(text), styles[style or 'Normal'], bulletText='•' if style == 'List Bullet' else None))

def bullet(text):
    paragraph(text, 'List Bullet')

def heading(text):
    document.add_heading(text, level=1)

def role(title, organization, dates):
    document.add_heading(title, level=2)
    paragraph(f'{organization} | {dates} | Remote, Orlando, FL', 'Role detail')

paragraph('Matthew Clark', 'Title')
paragraph('Senior Software Engineer | Application Architecture | System Design')
paragraph('Orlando, FL | linkedin.com/in/everdein | github.com/everdein')
paragraph('Portfolio: everdein.github.io/portfolio')
heading('Professional Summary')
paragraph('Hands-on senior software engineer and technical leader with 5+ years of software engineering experience. Design across applications, backend services, APIs, storage, and enterprise integrations. Previously owned frontend architecture for two customer-facing life insurance applications, established shared engineering practices, and supported a six-engineer team through design and delivery.')
heading('Professional Experience')
role('Senior Software Engineer', 'PBK', 'Sep 2026–Present')
bullet('Provide technical direction and hands-on engineering across applications, data platforms, and enterprise integrations. Define system boundaries, interfaces, data flows, and upstream and downstream dependencies with business stakeholders, IT, and external development teams.')
bullet('Develop and evaluate solutions using Microsoft Azure, Databricks, Microsoft Fabric, Next.js, and Abacus.AI, with integration work involving Concur, Workday, Deltek, Salesforce, and Autodesk.')
bullet('Build an AI-assisted PDF review workflow intended to cover 1,200+ Deltek projects, identifying missing data and developing green, yellow, and red completeness ratings. Work is ongoing.')
bullet('Review applications, guide technical handoffs, and establish practices for code quality, documentation, maintainability, and ongoing ownership.')
role('Lead Software Engineer', 'State Farm', 'Sep 2023–Sep 2026')
bullet('Owned frontend architecture and technical direction for two customer-facing life insurance applications using React, TypeScript, and Redux. Guided delivery across application, API, and downstream-service boundaries while supporting a six-engineer team.')
bullet('Established shared architecture and roughly 40 common modules. Led migration from a retiring UI framework to the enterprise design system while product delivery continued.')
bullet('Expanded the primary application to 3,335 automated test cases at 97.08% coverage; established six CI quality gates with Playwright and Axe browser and accessibility validation.')
bullet('Redesigned multistage Docker builds and nginx packaging to exclude more than 600 MB of build-time dependencies from final images across both applications.')

document.add_page_break()
heading('Professional Experience Continued')
document.add_heading('State Farm — Lead Software Engineer continued', level=2)
bullet('Remediated 10 vulnerability findings spanning five CVEs, including seven Critical-severity findings. Delivered containerized frontend applications through Red Hat OpenShift on AWS.')
bullet('Resolved cross-system blockers for transaction and reporting workflows across engineering, data, analytics, and business teams. Traced API, orchestration, and business-event dependencies to troubleshoot production issues.')
bullet('Created a 45-page engineering knowledge base and reusable tooling that other engineers independently extended. Mentored through design, reviews, and pairing; supported stakeholder demos and technical interviews.')
role('Software Engineer', 'State Farm', 'Jun 2021–Sep 2023')
bullet('Built and maintained React, TypeScript, and Redux applications; implemented multi-step policy workflows, validation, state management, and backend API integrations.')
bullet('Expanded automated testing and reusable components; collaborated with product, UX, and backend teams on accessibility, troubleshooting, and production delivery. Promoted to Lead in September 2023.')
heading('Selected Independent Projects')
document.add_heading('Financial Pay Period Planner', level=2)
paragraph('Independently built household cash-flow application using React, TypeScript, Redux Toolkit, Spring Boot, PostgreSQL, and Flyway. Implemented database-backed sessions, CSRF protection, workspace isolation, and explicit version-checked saves. Verification includes Vitest, Playwright, PostgreSQL integration tests, JaCoCo, and accessibility checks. Local-first; not production hosted.')
document.add_heading('DSA Dojo — Interactive Algorithm Studio', level=2)
paragraph('Framework-free JavaScript learning application with 55 interactive lessons across 20 topics. Deterministic traces synchronize visualization, source highlighting, narration, and accessible playback. Includes algorithm comparisons, device-local progress, and Node.js, Playwright, and axe-core verification.')
heading('Technical Capabilities')
paragraph('System design, application and solution architecture, full-stack development, technical leadership, and system integration. React, TypeScript, JavaScript, Java, Spring Boot, PostgreSQL, Redux Toolkit, Docker, CI/CD, test automation, application security, and web accessibility.')
paragraph('AI-assisted programming across professional and independent development, with human review and architectural ownership. Applied generative AI for document analysis at PBK.')
heading('Education')
paragraph('Bachelor of Science in Computer Science | Bellevue College, Bellevue, Washington')

output = Path('tmp/resume-review/matthew-clark-resume.pdf')
output.parent.mkdir(parents=True, exist_ok=True)
pdf = SimpleDocTemplate(str(output), pagesize=(612, 792), topMargin=42, bottomMargin=42, leftMargin=48, rightMargin=48, title='Matthew Clark Software Engineering Resume', author='Matthew Clark')
def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 9)
    canvas.setFillColor(colors.HexColor('#555555'))
    canvas.drawString(48, 24, 'Matthew Clark | Software Engineering')
    canvas.drawRightString(564, 24, str(doc.page))
    canvas.restoreState()
pdf.build(story, onFirstPage=page_footer, onLaterPages=page_footer)
print(output)
