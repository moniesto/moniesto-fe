import { Card, Stack } from "@mui/material";
import { useEffect } from "react";

export const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Card
      sx={{
        paddingBottom: 2,
      }}
    >
      <Stack mt={2} p={3} spacing={4}>
        {/* <Typography variant="h2" sx={{ opacity: 0.9 }}>
          {translate("navigation.terms-conditions")}
        </Typography> */}
        <div>
          <h1>Terms and Conditions</h1>
          <p>Last updated: September 24, 2023</p>

          <p>
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use Moniesto if you do not agree to
            take all of the terms and conditions stated on this page.
          </p>
          <h2>License</h2>
          <p>
            By sharing content on Moniesto, you grant the platform a
            non-exclusive, royalty-free, worldwide license to use, reproduce,
            modify, adapt, publish, translate, distribute, and display the
            content. This license extends to the operation, promotion, and
            improvement of Moniesto, ensuring the platform's functionality and
            growth. You acknowledge that this license allows Moniesto to make
            your content available to other users of the platform. Moniesto may
            also sublicense its rights to third parties, such as service
            providers, for the purpose of providing and enhancing the platform's
            features. By contributing content to Moniesto, you represent and
            warrant that you have the necessary rights to grant this license and
            that your content does not violate any laws or infringe upon the
            rights of any third party. Moniesto reserves the right to remove any
            content that violates these Terms and Conditions or is deemed
            inappropriate, ensuring the maintenance of a positive and
            constructive environment within the platform.
          </p>

          <h2>Subscription Model</h2>
          <p>
            Moniesto's operational backbone is its subscription model. This
            empowers Moniests to set personalized subscription prices for their
            insights, with all transactions conducted using cryptocurrency,
            specifically through the secure Binance Pay service.
          </p>

          <h2>Refund Policy</h2>
          <p>
            When placing an order or making a purchase at Moniesto, you agree to
            the terms along with Moniesto's Privacy Policy. At the time of
            Refund and Payout, there will be Operation Fee applied by the
            system. Moniesto also retains the authority to unilaterally adjust
            the Operation Fee rate whenever it deems necessary.
          </p>

          <h2>User Acknowledgment and Agreement</h2>
          <p>
            By using our app, registering an account, or making a payment, you
            hereby consent to our Terms & Conditions.
          </p>

          <h2>Cookies</h2>
          <p>
            Moniesto uses "Cookies" to improve user experience. A Cookie is a
            small piece of data stored on your computer or mobile device by your
            web browser. You can instruct Your browser to refuse all Cookies or
            to indicate when a Cookie is being sent. However, if You do not
            accept Cookies, You may not be able to use some parts of our
            Service. Unless you have adjusted Your browser setting so that it
            will refuse Cookies, our Service may use Cookies.
          </p>

          <h2>Modifications to Terms of Service</h2>
          <p>
            If we decide to change our Terms & Conditions, we will post those
            changes on this page, and/or update the Terms & Conditions
            modification date below.
          </p>

          <h2>User Responsibilities</h2>
          <p>
            <strong>Personal Responsibility for Investments:</strong> Moniesto
            steadfastly adheres to the principle of not providing financial
            advice or investment recommendations. Users are unequivocally
            responsible for their investment decisions, underscoring the
            importance of conducting personal research, due diligence, and
            employing critical analysis before making any financial commitments.
          </p>
          <p>
            <strong>Recognition of Market Dynamics:</strong> Moniesto expects
            users to recognize and appreciate the multifaceted and dynamic
            nature of financial markets, understanding the inherent risks
            associated with investment transactions.
          </p>

          <h2>Content on Moniesto</h2>
          <p>
            <strong>User-generated Content:</strong> The content shared on
            Moniesto is a mosaic of individual Moniests' opinions and does not
            constitute official advice from Moniesto.
          </p>
          <p>
            <strong>Informational Purpose:</strong> All content shared on the
            platform is intended purely for informational purposes. It should
            not be construed as explicit investment guidance.
          </p>

          <h2>Payment</h2>
          <p>
            Our users make payments using cryptocurrencies when subscribing to
            Moniest. Payments are processed through the Binance Pay service, and
            users make payments equal to the total subscription period.
            Subscriptions do not renew automatically. By making payments through
            Binance Pay, you also automatically accept their Terms of Use and
            Privacy Policy.
          </p>

          <h2>Payout</h2>
          <p>
            At the time of Refund and Payout, there will be Operation Fee
            applied by the system. Moniesto also retains the authority to
            unilaterally adjust the Operation Fee rate whenever it deems
            necessary.
          </p>

          <h2>Security</h2>
          <p>
            We do not assume responsibility for any security breaches or
            unauthorized access that may occur as a result of user actions.
            Please exercise caution and ensure the security of your own device
            and browser settings when using our services to minimize any
            potential risks associated with data storage.
          </p>

          <p>
            The security of Your Personal Data is important to Us, but remember
            that no method of transmission over the Internet, or method of
            electronic storage is 100% secure. While We strive to use
            commercially acceptable means to protect Your Personal Data, We
            cannot guarantee its absolute security.
          </p>

          <h2>Content Moderation</h2>
          <p>
            Moniesto reserves the right to remove any content that violates our
            guidelines or is deemed inappropriate. This ensures a positive,
            constructive, and respectful environment for all users.
          </p>

          <h2>Platform Evolution</h2>
          <p>
            Moniesto is dedicated to continuous updates and improvements based
            on user feedback, ensuring the platform evolves dynamically to meet
            the ever-changing needs of our community.
          </p>

          <h2>User Feedback Loop</h2>
          <p>
            Moniesto actively encourages users to provide feedback. We try to
            establish open channels for users to share their thoughts,
            suggestions, and concerns, contributing to the continual improvement
            of the platform.
          </p>

          <h2>Community Guidelines</h2>
          <p>
            To foster a positive and constructive environment, Moniesto has
            established community guidelines. Users are expected to adhere to
            these guidelines when engaging with content and fellow Moniests.
          </p>

          <h2>Accessibility Commitment</h2>
          <p>
            Moniesto is committed to ensuring platform accessibility for users
            of diverse abilities. We continually strive to improve accessibility
            features based on user feedback.
          </p>

          <h2>Guardianship</h2>
          <p>
            By using the app, you agree to indemnify and hold Moniesto, its
            parents, subsidiaries, affiliates, officers, employees, agents,
            partners, and licensors (if any) harmless from any claim or demand,
            including reasonable attorneys' fees. This indemnification is
            applicable due to or arising out of:
          </p>
          <ul>
            <li>Your utilization of the app.</li>
            <li>
              Your breach of this Agreement or any applicable law or regulation.
            </li>
            <li>Your infringement of any rights belonging to a third party.</li>
          </ul>
          <p>
            This indemnification clause is in place to ensure that Moniesto and
            its associated entities are protected from legal claims or demands
            that may arise as a result of your actions or use of the app.
          </p>

          <h2>Your Consent</h2>
          <p>
            By using Moniesto, you expressly consent to the terms outlined in
            these Terms and Conditions, acknowledging that you have read,
            understood, and agreed to be bound by them.
          </p>

          <h2>Restrictions</h2>
          <p>
            Users of Moniesto are expected to comply with all applicable laws
            and regulations. They should refrain from engaging in conduct that
            is unlawful, defamatory, or harmful. Unauthorized access or any form
            of hacking is strictly prohibited. Uploaded content should be free
            from viruses, malware, or harmful components. Impersonation of
            individuals or entities, including Moniesto or its representatives,
            is not allowed. Users must respect the intellectual property and
            proprietary rights of third parties. Moniesto should be used for
            personal, non-commercial purposes only. Engagement in malicious
            activities that may harm the platform is prohibited. Users are
            required to comply with ethical and legal standards, avoiding any
            illegal activities. Additionally, copying the content of others is
            expressly prohibited. Violation of these restrictions may result in
            content removal, suspension, or termination of user accounts.
          </p>

          <h2>No Warranties</h2>
          <p>
            Moniesto provides its platform on an "as is" and "as available"
            basis. We make no representations or warranties of any kind, express
            or implied, regarding the platform's operation or the content shared
            by Moniests. We do not warrant that the platform will be error-free,
            secure, or uninterrupted. Moniesto disclaims all warranties,
            including but not limited to the implied warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement. Moniesto does not guarantee the accuracy,
            completeness, or reliability of any content shared on the platform.
            Users acknowledge that reliance on such content is at their own
            risk. Any advice or information obtained through Moniesto, whether
            oral or written, does not create any warranty not expressly stated
            in these Terms and Conditions. Users are solely responsible for
            evaluating the risks associated with the use of Moniesto and its
            content. Moniesto does not endorse or guarantee any specific
            financial strategies or outcomes.
          </p>

          <h2>Severability</h2>
          <p>
            In the event that any provision of these Terms and Conditions is
            deemed invalid or unenforceable, it shall not affect the validity
            and enforceability of the remaining provisions. The unenforceable
            provision will be severed from these terms, and the rest of the
            agreement will remain in full force and effect. This provision
            underscores the intention that each part of the agreement is
            independently valid, allowing the remaining terms to stand even if
            one part is found to be unenforceable.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All intellectual property rights related to the Moniesto platform,
            including but not limited to copyrights, trademarks, trade secrets,
            and patents, are the sole property of Moniesto and its licensors. By
            using the platform, you acknowledge and agree that you do not
            acquire any ownership or rights to the intellectual property. This
            license does not grant the right to reproduce, modify, distribute,
            or create derivative works based on the intellectual property of
            Moniesto. Users are prohibited from engaging in any activities that
            may infringe upon or violate the intellectual property rights of
            Moniesto or third parties. Any unauthorized use or reproduction of
            intellectual property is strictly prohibited and may result in legal
            action. Moniesto respects the intellectual property rights of others
            and expects users to do the same. If you believe that your
            intellectual property rights have been infringed upon, please
            contact Moniesto promptly.
          </p>

          <h2>Disclaimer</h2>
          <p>
            We want you to succeed, and that starts with understanding the risks
            in investment. Before you start doing investment transactions, it's
            advised to have the necessary knowledge, not directly apply
            analyses, conduct your own research, and implement the investment
            model that suits you best for potential income. Remember that the
            profits and losses you get based on analyses are entirely your
            responsibility. We recommend you to manage positions effectively
            using stop levels. The content shared on the Moniesto platform
            doesn't include any investment advice. Moniesto is not responsible
            for any content shared here. Moniesto don't control or influence the
            risks in the investment market. All the information contained in an
            analysis is shared only to assist investors by Analysts (Moniests).
            Moniesto is not responsible for that shared information.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Terms and Conditions, You can
            contact us: official@moniesto.com
          </p>
        </div>
      </Stack>
    </Card>
  );
};
