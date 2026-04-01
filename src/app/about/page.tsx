/**
 * About Page — Jennie Slade Photography
 *
 * This is a Server Component (no 'use client'). It uses ScrollFade (a Client Component)
 * as a child, which is fine in Next.js App Router.
 *
 * Page structure (top to bottom):
 *   1. Photo + Intro          — immediately visible, no ScrollFade
 *   2. Origin Story           — wrapped in ScrollFade
 *   3. What to Expect         — wrapped in ScrollFade
 *   4. Twenty Years           — wrapped in ScrollFade
 *   5. Testimonial 1          — wrapped in ScrollFade
 *   6. A Little More About Me — wrapped in ScrollFade
 *   7. Testimonial 2          — wrapped in ScrollFade
 *   8. CTA                    — wrapped in ScrollFade
 *
 * Voice: First person. Warm, conversational, story-first. No em dashes. Short paragraphs.
 * See CLAUDE.md for full voice and design system guidelines.
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import ScrollFade from '@/components/ui/ScrollFade'

export const metadata: Metadata = {
  title: 'About | Jennie Slade Photography',
  description:
    'Las Vegas portrait photographer with over twenty years of experience capturing families, weddings, and seniors. Meet Jennie and learn her story.',
}

export default function AboutPage() {
  return (
    <main>

      {/* ── Section 1: Photo + Intro ──────────────────────────────────────────
          NOT wrapped in ScrollFade — should be immediately visible on page load.
          Centered column, max-w-3xl for comfortable reading at portrait width.    */}
      <Section variant="default" className="pt-32 md:pt-40">
        <div className="max-w-3xl mx-auto text-center">

          {/* Jennie's headshot with her Canon camera */}
          <div className="mx-auto w-full max-w-md mb-12 overflow-hidden rounded-sm">
            <Image
              src="/images/jennie-headshot.png"
              alt="Jennie Slade holding her Canon camera, black and white portrait"
              width={800}
              height={1067}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Page title — Libre Baskerville, uppercase */}
          <h1 className="type-title mb-4">Hello, I&apos;m Jennie</h1>

          {/* Decorative subtitle — Montserrat uppercase, small */}
          <p className="type-heading mb-10">Las Vegas Portrait Photographer</p>

          {/* Short warm intro to bridge the gap before the origin story */}
          <p className="type-body max-w-2xl mx-auto">
            I&apos;m so glad you&apos;re here. Whether you found me through a friend, a Google search,
            or you&apos;ve been coming back for years, I want you to know a little about the person
            behind the camera.
          </p>

        </div>
      </Section>

      {/* Decorative divider */}
      <div className="flex justify-center py-4"><div className="w-16 border-t border-warm-gray" /></div>

      {/* ── Section 2: Origin Story ────────────────────────────────────────── */}
      <ScrollFade>
        <Section variant="default">
          <div className="max-w-2xl mx-auto text-center">

            <h2 className="type-heading mb-8">How It All Started</h2>

            {/* Beat: Grandpa's darkroom — photography is in her blood */}
            <p className="type-body mb-6">
              Photography has been part of my life for as long as I can remember. My grandpa was the one
              who taught me. He had a developing darkroom set up in his bathroom, and I thought it was the
              coolest thing in the world. Watching a photo appear on paper felt like magic.
            </p>

            {/* Beat: First daughter sparked the real passion */}
            <p className="type-body mb-6">
              When my first daughter was born, I knew I wanted beautiful photos of her. Not just snapshots,
              but real portraits that captured who she was. So I got a good camera, practiced constantly,
              and fell completely in love with it all over again.
            </p>

            {/* Beat: Word of mouth turned it into a career */}
            <p className="type-body mb-6">
              Then something funny happened. Friends started asking me to take photos of their kids. Then
              their friends asked. And their friends. Before I knew it, I had a business. That was over
              twenty years ago, and I still can&apos;t believe I get to do this for a living.
            </p>

          </div>
        </Section>
      </ScrollFade>

      {/* Decorative divider */}
      <div className="flex justify-center py-4"><div className="w-16 border-t border-warm-gray" /></div>

      {/* ── Personal photo: travel/adventure ─────────────────────────────── */}
      <ScrollFade>
        <Section variant="muted">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="overflow-hidden rounded-sm aspect-[3/4]">
              <Image
                src="/images/jennie-photo-2.jpg"
                alt="Jennie traveling with her partner overlooking the ocean"
                width={600}
                height={900}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-sm aspect-[3/4]">
              <Image
                src="/images/jennie-photo-3.jpg"
                alt="Jennie exploring a European city"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Section>
      </ScrollFade>

      {/* Decorative divider */}
      <div className="flex justify-center py-4"><div className="w-16 border-t border-warm-gray" /></div>

      {/* ── Section 3: What to Expect ─────────────────────────────────────── */}
      <ScrollFade>
        <Section variant="muted">
          <div className="max-w-2xl mx-auto text-center">

            <h2 className="type-heading mb-8">What to Expect</h2>

            {/* Sessions are relaxed and fun — no stiff posing */}
            <p className="type-body mb-6">
              Here&apos;s what I want you to know. Sessions with me are not stiff or formal. There&apos;s
              no awkward posing or forced smiles. I&apos;m the photographer who gets down on the ground
              with your toddler, cracks jokes with your teenager, and makes your husband forget he
              didn&apos;t want to be there.
            </p>

            {/* The real moments — belly laughs, little hands, the look */}
            <p className="type-body mb-6">
              My favorite photos are the ones where you forgot I was even shooting. The belly laugh.
              The little hand reaching up. The look between you and your partner that says everything.
              Those are the moments worth keeping.
            </p>

          </div>
        </Section>
      </ScrollFade>

      {/* Decorative divider */}
      <div className="flex justify-center py-4"><div className="w-16 border-t border-warm-gray" /></div>

      {/* ── Jennie in action: shooting photos ──────────────────────────────── */}
      <ScrollFade>
        <Section variant="default">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="overflow-hidden rounded-sm aspect-[3/4]">
              <Image
                src="/images/jennie-shooting-1.jpg"
                alt="Jennie photographing a client at the Welcome to Las Vegas sign"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-sm aspect-[3/4]">
              <Image
                src="/images/jennie-shooting3.jpg"
                alt="Jennie photographing a portrait session"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Section>
      </ScrollFade>

      {/* Decorative divider */}
      <div className="flex justify-center py-4"><div className="w-16 border-t border-warm-gray" /></div>

      {/* ── Section 4: Generational Story ────────────────────────────────── */}
      <ScrollFade>
        <Section variant="default">
          <div className="max-w-2xl mx-auto text-center">

            <h2 className="type-heading mb-8">Twenty Years of Your Stories</h2>

            {/* The generational continuity — her superpower */}
            <p className="type-body mb-6">
              This is the part that still gets me. I&apos;ve been photographing some of the same families
              for over eighteen years. The tiny newborn I cradled for her first portrait? She&apos;s a
              senior now. Some of those babies are getting married. A few are even having babies of
              their own.
            </p>

            {/* Honored to be part of their story */}
            <p className="type-body mb-6">
              There is nothing in this world like watching a family grow up through my lens. Every
              session is a new chapter, and I&apos;m honored to be the one who gets to write it down
              in photos.
            </p>

          </div>
        </Section>
      </ScrollFade>

      {/* ── Section 5: Testimonial Placeholder 1 ─────────────────────────── */}
      <ScrollFade>
        <Section variant="warm">
          <div className="max-w-2xl mx-auto text-center">

            {/* Editorial testimonial callout — Arapey italic, placeholder text (D-11, D-12, D-13)
                Replace with a real client quote when available. */}
            <blockquote className="type-accent text-[20px] italic leading-relaxed text-gray">
              <span className="text-[48px] leading-none text-warm-gray block mb-2">&ldquo;</span>
              Your testimonial will appear here.
            </blockquote>

          </div>
        </Section>
      </ScrollFade>

      {/* Decorative divider */}
      <div className="flex justify-center py-4"><div className="w-16 border-t border-warm-gray" /></div>

      {/* ── Section 6: A Little More About Me ────────────────────────────── */}
      <ScrollFade>
        <Section variant="default">
          <div className="max-w-2xl mx-auto text-center">

            <h2 className="type-heading mb-8">A Little More About Me</h2>

            {/* Personal: mother of five, every stage of family life */}
            <p className="type-body mb-6">
              When I&apos;m not behind the camera, I&apos;m a mom of five. My kids range from 13 to 25,
              and one of them is married now. I&apos;ve lived every stage of family life that I
              photograph, from sleepless newborn nights to watching your baby walk across a graduation
              stage.
            </p>

            {/* Personal: Las Vegas native */}
            <p className="type-body mb-6">
              I&apos;m a Las Vegas native, born and raised. This city is home, and so are the families
              who live here. I love that I get to be part of your story.
            </p>

            {/* Family photo */}
            <div className="mt-10 overflow-hidden rounded-sm">
              <Image
                src="/images/jennie-family.jpg"
                alt="Jennie Slade with her family"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>

          </div>
        </Section>
      </ScrollFade>

      {/* ── Section 7: Testimonial Placeholder 2 ─────────────────────────── */}
      <ScrollFade>
        <Section variant="muted">
          <div className="max-w-2xl mx-auto text-center">

            {/* Second editorial testimonial callout — same pattern as Section 5 */}
            <blockquote className="type-accent text-[20px] italic leading-relaxed text-gray">
              <span className="text-[48px] leading-none text-warm-gray block mb-2">&ldquo;</span>
              Your testimonial will appear here.
            </blockquote>

          </div>
        </Section>
      </ScrollFade>

      {/* ── Section 8: CTA ───────────────────────────────────────────────── */}
      <ScrollFade>
        <Section variant="default">
          <div className="max-w-2xl mx-auto text-center">

            <h2 className="type-heading mb-6">Let&apos;s Work Together</h2>

            {/* Warm, inviting CTA copy — not salesy (D-14, D-15) */}
            <p className="type-body mb-8">
              I&apos;d love to hear your story. Whether it&apos;s a growing family, a wedding day, or
              a senior ready to take on the world, let&apos;s chat about capturing it.
            </p>

            {/* Primary button linking to /contact (ABOU-05) */}
            <Button href="/contact">Get in Touch</Button>

          </div>
        </Section>
      </ScrollFade>

    </main>
  )
}
