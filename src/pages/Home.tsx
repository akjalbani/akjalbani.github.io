import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Github, ExternalLink, Award, BookOpen, Briefcase, Code, Cloud, Shield } from "lucide-react";

/**
 * Design Philosophy: Modern Tech Professional
 * - Deep navy background with cyan accents and gold highlights
 * - Asymmetric layouts with staggered card designs
 * - Poppins for headings, Inter for body text
 * - Subtle depth and smooth animations
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-poppins">Dr. Akhtar Jalbani</h1>
          <div className="flex gap-6">
            <a href="#expertise" className="text-sm hover:text-primary transition">Expertise</a>
            <a href="#publications" className="text-sm hover:text-primary transition">Publications</a>
            <a href="#contact" className="text-sm hover:text-primary transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/hero-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-1" />
        
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-primary font-poppins font-semibold text-sm uppercase tracking-wider">
                  Cybersecurity & Cloud Computing Expert
                </p>
                <h2 className="text-5xl md:text-6xl font-poppins font-bold leading-tight">
                  Securing Digital Futures
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Over two decades of expertise in cybersecurity, cloud computing, and AI. Currently a Lecturer at RMIT University, AWS Community Builder, and founding member of the Asia-Europe for Artificial Intelligence Network.
              </p>

              <div className="flex gap-4 pt-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-poppins">
                  View CV
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Get in Touch
                </Button>
              </div>

              <div className="flex gap-6 pt-8">
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-3xl" />
              <div 
                className="relative rounded-2xl overflow-hidden h-96 border border-primary/30"
                style={{
                  backgroundImage: "url('/images/expertise-bg.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 bg-card/50 border-y border-border">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-poppins font-bold text-primary mb-2">20+</div>
              <p className="text-muted-foreground">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-poppins font-bold text-primary mb-2">68</div>
              <p className="text-muted-foreground">Research Citations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-poppins font-bold text-primary mb-2">25+</div>
              <p className="text-muted-foreground">Publications</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-poppins font-bold text-primary mb-2">4</div>
              <p className="text-muted-foreground">AWS Certifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24">
        <div className="container">
          <div className="mb-16">
            <p className="text-primary font-poppins font-semibold text-sm uppercase tracking-wider mb-2">
              Core Competencies
            </p>
            <h2 className="text-4xl font-poppins font-bold">Areas of Expertise</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Cybersecurity */}
            <Card className="bg-card/80 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-poppins font-bold mb-3">Cybersecurity</h3>
                <p className="text-muted-foreground mb-4">
                  Network security, web application security, security modeling, and digital discipline practices.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Layer 2 Network Security
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Web Application Security
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Security Frameworks
                  </li>
                </ul>
              </div>
            </Card>

            {/* Cloud Computing */}
            <Card className="bg-card/80 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition">
                  <Cloud className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-poppins font-bold mb-3">Cloud & AWS</h3>
                <p className="text-muted-foreground mb-4">
                  AWS Certified Professional and Community Builder with expertise in cloud architecture and security.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    AWS Certifications
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Cloud Architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Infrastructure Security
                  </li>
                </ul>
              </div>
            </Card>

            {/* Research & Teaching */}
            <Card className="bg-card/80 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-poppins font-bold mb-3">Research & Teaching</h3>
                <p className="text-muted-foreground mb-4">
                  Active researcher focusing on AI, blockchain, and data provenance with strong mentoring commitment.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    AI & Blockchain
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Data Provenance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Academic Mentoring
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Education & Credentials */}
      <section className="py-24 bg-card/30">
        <div className="container">
          <div className="mb-16">
            <p className="text-primary font-poppins font-semibold text-sm uppercase tracking-wider mb-2">
              Academic Foundation
            </p>
            <h2 className="text-4xl font-poppins font-bold">Education & Certifications</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-poppins font-bold mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Education
              </h3>
              <div className="space-y-6">
                <div className="border-l-2 border-primary pl-6 pb-6">
                  <h4 className="font-poppins font-bold text-lg">Ph.D. in Computer Science</h4>
                  <p className="text-primary text-sm font-semibold">Georg-August-Universität Göttingen</p>
                  <p className="text-muted-foreground text-sm">2007 - 2011 | Germany</p>
                </div>
                <div className="border-l-2 border-primary pl-6 pb-6">
                  <h4 className="font-poppins font-bold text-lg">MS in Software Engineering</h4>
                  <p className="text-primary text-sm font-semibold">National University of Sciences & Technology</p>
                  <p className="text-muted-foreground text-sm">2000 - 2002 | Pakistan</p>
                </div>
                <div className="border-l-2 border-primary pl-6">
                  <h4 className="font-poppins font-bold text-lg">BE in Electrical Engineering</h4>
                  <p className="text-primary text-sm font-semibold">NED University of Engineering & Technology</p>
                  <p className="text-muted-foreground text-sm">1995 - 1999 | Pakistan</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-poppins font-bold mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-primary" />
                Certifications
              </h3>
              <div className="space-y-3">
                <div className="bg-card/80 border border-border rounded-lg p-4 hover:border-primary/50 transition">
                  <p className="font-poppins font-semibold">AWS Certified Professional</p>
                  <p className="text-sm text-muted-foreground">Amazon Web Services</p>
                </div>
                <div className="bg-card/80 border border-border rounded-lg p-4 hover:border-primary/50 transition">
                  <p className="font-poppins font-semibold">AWS Community Builder</p>
                  <p className="text-sm text-muted-foreground">Amazon Web Services</p>
                </div>
                <div className="bg-card/80 border border-border rounded-lg p-4 hover:border-primary/50 transition">
                  <p className="font-poppins font-semibold">CCNA: Introduction to Networks</p>
                  <p className="text-sm text-muted-foreground">Cisco Networking Academy</p>
                </div>
                <div className="bg-card/80 border border-border rounded-lg p-4 hover:border-primary/50 transition">
                  <p className="font-poppins font-semibold">AWS Cloud Quest: Cloud Practitioner</p>
                  <p className="text-sm text-muted-foreground">Amazon Web Services Training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="py-24">
        <div className="container">
          <div className="mb-16">
            <p className="text-primary font-poppins font-semibold text-sm uppercase tracking-wider mb-2">
              Career Path
            </p>
            <h2 className="text-4xl font-poppins font-bold">Professional Experience</h2>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-primary mt-2" />
                <div className="w-1 h-24 bg-gradient-to-b from-primary to-primary/20" />
              </div>
              <div className="pb-12">
                <h3 className="text-xl font-poppins font-bold">Lecturer at RMIT University</h3>
                <p className="text-primary text-sm font-semibold">July 2024 - Present</p>
                <p className="text-muted-foreground mt-2">Melbourne, Victoria, Australia</p>
                <p className="mt-3">Teaching cybersecurity, virtualization, and cloud computing to undergraduate and postgraduate students.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-primary mt-2" />
                <div className="w-1 h-24 bg-gradient-to-b from-primary to-primary/20" />
              </div>
              <div className="pb-12">
                <h3 className="text-xl font-poppins font-bold">Lecturer at Holmesglen Institute</h3>
                <p className="text-primary text-sm font-semibold">April 2019 - July 2024</p>
                <p className="text-muted-foreground mt-2">Melbourne, Victoria, Australia</p>
                <p className="mt-3">Delivered higher education teaching in cybersecurity and information technology with trainer and assessor responsibilities.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-primary mt-2" />
                <div className="w-1 h-24 bg-gradient-to-b from-primary to-primary/20" />
              </div>
              <div>
                <h3 className="text-xl font-poppins font-bold">Assistant Professor at Sindh Agricultural University</h3>
                <p className="text-primary text-sm font-semibold">April 2011 - April 2018</p>
                <p className="text-muted-foreground mt-2">Tandojam, Pakistan</p>
                <p className="mt-3">Taught programming, big data, and database administration while supervising research projects in multiple domains.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Publications */}
      <section id="publications" className="py-24 bg-card/30">
        <div className="container">
          <div className="mb-16">
            <p className="text-primary font-poppins font-semibold text-sm uppercase tracking-wider mb-2">
              Research Output
            </p>
            <h2 className="text-4xl font-poppins font-bold">Featured Publications</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/80 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <div className="p-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">2025</span>
                </div>
                <h3 className="text-xl font-poppins font-bold mb-2 group-hover:text-primary transition">
                  Enhancing Data Provenance in AI with Blockchain Technology
                </h3>
                <p className="text-sm text-primary font-semibold mb-3">CSI Transactions on ICT</p>
                <p className="text-muted-foreground mb-6">
                  A comprehensive quality model for assessing data quality in AI systems using blockchain technology and ISO/IEC 9126 standards.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition font-semibold text-sm">
                  Read Publication <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </Card>

            <Card className="bg-card/80 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <div className="p-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">2014</span>
                </div>
                <h3 className="text-xl font-poppins font-bold mb-2 group-hover:text-primary transition">
                  Security Modeling for Service-Oriented Systems
                </h3>
                <p className="text-sm text-primary font-semibold mb-3">Software & Systems Modeling</p>
                <p className="text-muted-foreground mb-6">
                  Using security pattern refinement approach for modeling secure service-oriented architectures. 16 citations.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition font-semibold text-sm">
                  Read Publication <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              View All Publications (25+)
            </Button>
          </div>
        </div>
      </section>

      {/* Community & Speaking */}
      <section className="py-24">
        <div className="container">
          <div className="mb-16">
            <p className="text-primary font-poppins font-semibold text-sm uppercase tracking-wider mb-2">
              Community Involvement
            </p>
            <h2 className="text-4xl font-poppins font-bold">Speaking & Leadership</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-poppins font-bold mb-2">Founding Member - AE4AI Network</h3>
              <p className="text-primary text-sm font-semibold mb-2">Asia-Europe for Artificial Intelligence</p>
              <p className="text-muted-foreground">
                Established at ASEF InnoLab 4 in Shanghai (October 2023). Collaborating on AI initiatives between Asia and Europe.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-poppins font-bold mb-2">Committee Member - SAI Conference</h3>
              <p className="text-primary text-sm font-semibold mb-2">Computing Conference 2026</p>
              <p className="text-muted-foreground">
                Contributing expertise in AI, security, and software engineering to international conference programming.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-poppins font-bold mb-2">AWS Community Builder</h3>
              <p className="text-primary text-sm font-semibold mb-2">Amazon Web Services</p>
              <p className="text-muted-foreground">
                Active contributor sharing cloud security best practices and conducting hands-on AWS workshops.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-poppins font-bold mb-2">Technical Writer</h3>
              <p className="text-primary text-sm font-semibold mb-2">Medium & Dev.to</p>
              <p className="text-muted-foreground">
                Publishing articles on cybersecurity, AWS, and cloud architecture to reach global technical audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-card/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-poppins font-bold mb-6">Let's Connect</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Interested in collaboration, speaking opportunities, or discussing cybersecurity and cloud computing? Feel free to reach out.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-poppins px-8">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-poppins px-8">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn Profile
              </Button>
            </div>

            <div className="mt-12 pt-12 border-t border-border">
              <p className="text-sm text-muted-foreground">
                © 2025 Dr. Akhtar Ali Jalbani. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
