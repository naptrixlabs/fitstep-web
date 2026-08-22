import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { CONTACT_EMAIL } from '../lib/config';

/**
 * The page the App Store "Support URL" points at.
 *
 * It has to stand on its own for someone who has never opened the app — an App
 * Review reviewer among them — so everything needed to get help is here rather
 * than behind a sign-in: a real address that receives mail, what to include, how
 * long a reply takes, and the account-deletion route Apple requires apps with
 * accounts to document.
 */
export function SupportPage() {
  const subject = encodeURIComponent('Vive support');
  const body = encodeURIComponent(
    'Describe what happened:\n\n\n'
    + 'What you were doing when it happened:\n\n\n'
    + 'Device (e.g. iPhone 15, iOS 18.2):\n\n'
    + 'App version (Settings › About):\n\n',
  );

  return (
    <div className="doc-page">
      <div className="doc-hero">
        <div className="doc-hero-inner">
          <span className="section-kicker">Support</span>
          <h1>We&rsquo;re here to help.</h1>
          <p className="doc-lede">
            Email us and a real person will read it. We aim to reply within two business days.
          </p>
        </div>
      </div>

      <div className="doc-body">
        <Reveal as="section" className="ns-card">
          <span className="ns-icon"><Icon name="spark" size={22} /></span>
          <h2>Contact us</h2>
          <div className="ns-body">
            <p>
              <a href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`}>{CONTACT_EMAIL}</a>
            </p>
            <p>
              To help us fix things faster, tell us what happened, what you were doing at the
              time, your device model and iOS version, and the app version from
              Settings&nbsp;&rsaquo;&nbsp;About.
            </p>
          </div>
        </Reveal>

        <Reveal as="section" className="ns-card" delay={70}>
          <span className="ns-icon"><Icon name="lock" size={22} /></span>
          <h2>Your account and your data</h2>
          <div className="ns-body">
            <p>
              You can delete your account, and everything logged in it, from inside the app:
              Settings&nbsp;&rsaquo;&nbsp;Account&nbsp;&rsaquo;&nbsp;Delete account. Deletion is
              permanent and removes your meals, weigh-ins, activities and goals.
            </p>
            <p>
              Prefer to ask us? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from
              the address on your account and we&rsquo;ll take care of it.
            </p>
          </div>
        </Reveal>

        <Reveal as="section" className="ns-card" delay={140}>
          <span className="ns-icon"><Icon name="check" size={22} /></span>
          <h2>Common questions</h2>
          <div className="ns-body">
            <p>
              <strong>My calorie target looks wrong.</strong> It is calculated from your height,
              weight, age, sex and activity level, then adjusted for your goal&rsquo;s weekly pace.
              Check those in Settings, and log a recent weigh-in — the target moves with your weight.
            </p>
            <p>
              <strong>My steps or workouts are missing.</strong> Connect Apple Health in
              Settings&nbsp;&rsaquo;&nbsp;Connections and allow every category you want imported.
              Vive only ever reads from Health; it never overwrites what is there.
            </p>
            <p>
              <strong>A workout appears twice.</strong> It shouldn&rsquo;t — imports are matched
              against what you already have. If you see a duplicate, email us with the date and
              time and we&rsquo;ll look into it.
            </p>
            <p>
              <strong>A food&rsquo;s numbers look off.</strong> Values come from public nutrition
              datasets and vary with recipe, brand and portion. See{' '}
              <a href="/nutrition">where our numbers come from</a>.
            </p>
            <p>
              <a href="/help">Read the full help guide</a>
            </p>
          </div>
        </Reveal>

        <Reveal as="section" className="ns-card" delay={210}>
          <span className="ns-icon"><Icon name="shield" size={22} /></span>
          <h2>Privacy and terms</h2>
          <div className="ns-body">
            <p>
              Vive carries no ads, no trackers and no analytics SDKs. Read the{' '}
              <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
            </p>
            <p className="muted">
              Vive is a wellness tool, not a medical device. Calories, BMR, TDEE and goal
              projections are estimates for general information only and are not medical advice.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
