import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Thetaphoa',
    description: 'Privacy Policy for Thetaphoa application',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

                <div className="text-sm text-gray-600 mb-8">
                    <p><strong>Last Updated:</strong> December 27, 2024</p>
                </div>

                <div className="prose prose-gray max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Welcome to Thetaphoa ("we," "our," or "us"). We are committed to protecting your personal information
                            and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                            your information when you use our shop management application and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">2.1 Personal Information</h3>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We may collect personal information that you provide to us, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Name and contact information (email address, phone number)</li>
                            <li>Account credentials (username and password)</li>
                            <li>Business information (shop name, business details)</li>
                            <li>Payment information (processed securely through third-party providers)</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">2.2 TikTok Integration Data</h3>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            When you connect your TikTok account, we may collect:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>TikTok account information (username, profile data)</li>
                            <li>Content metadata and statistics</li>
                            <li>Access tokens for API integration</li>
                            <li>Posting and scheduling preferences</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">2.3 Automatically Collected Information</h3>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We automatically collect certain information when you use our Service:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Device information (IP address, browser type, operating system)</li>
                            <li>Usage data (pages visited, features used, time spent)</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We use the collected information for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Provide and maintain our Service:</strong> To operate and maintain the shop management features</li>
                            <li><strong>TikTok integration:</strong> To enable scheduling, posting, and managing content on TikTok</li>
                            <li><strong>Account management:</strong> To manage your account and provide customer support</li>
                            <li><strong>Improve our Service:</strong> To understand how users interact with our Service and make improvements</li>
                            <li><strong>Communication:</strong> To send you updates, notifications, and marketing communications (with your consent)</li>
                            <li><strong>Security:</strong> To detect, prevent, and address technical issues and security threats</li>
                            <li><strong>Legal compliance:</strong> To comply with legal obligations and protect our rights</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. How We Share Your Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We may share your information with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>TikTok:</strong> When you use TikTok integration features, we share necessary data with TikTok's API</li>
                            <li><strong>Service providers:</strong> Third-party vendors who perform services on our behalf (hosting, analytics, payment processing)</li>
                            <li><strong>Legal requirements:</strong> When required by law or to protect our rights and safety</li>
                            <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-3">
                            We do not sell your personal information to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. TikTok Data Usage and Permissions</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            When you connect your TikTok account to our Service:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>We request only the minimum permissions necessary to provide scheduling and posting features</li>
                            <li>You can revoke TikTok access at any time through your TikTok account settings</li>
                            <li>We comply with TikTok's API Terms of Service and data handling requirements</li>
                            <li>TikTok data is stored securely and used only for the purposes you authorize</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Security</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your personal
                            information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security assessments and updates</li>
                            <li>Access controls and authentication</li>
                            <li>Secure data storage infrastructure</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-3">
                            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee
                            absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Data Retention</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We retain your personal information only for as long as necessary to fulfill the purposes outlined
                            in this Privacy Policy, unless a longer retention period is required by law. When you delete your
                            account, we will delete or anonymize your personal information unless we are required to retain it
                            for legal or legitimate business purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Your Privacy Rights</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Depending on your location, you may have the following rights regarding your personal information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Access:</strong> Request access to your personal information</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                            <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                            <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
                            <li><strong>Withdrawal of consent:</strong> Withdraw consent for data processing where applicable</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-3">
                            To exercise these rights, please contact us using the information provided below.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Cookies and Tracking Technologies</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We use cookies and similar tracking technologies to improve your experience:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Essential cookies:</strong> Required for the Service to function properly</li>
                            <li><strong>Analytics cookies:</strong> Help us understand how users interact with our Service</li>
                            <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-3">
                            You can control cookies through your browser settings, but disabling certain cookies may limit
                            some functionality of the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Third-Party Services</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our Service may contain links to third-party websites and services, including TikTok. We are not
                            responsible for the privacy practices of these third parties. We encourage you to review their
                            privacy policies before providing any personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Children's Privacy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our Service is not intended for children under the age of 13 (or 16 in the EEA). We do not knowingly
                            collect personal information from children. If you believe we have collected information from a child,
                            please contact us immediately so we can delete it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. International Data Transfers</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Your information may be transferred to and maintained on servers located outside of your country
                            where data protection laws may differ. By using our Service, you consent to the transfer of your
                            information to our facilities and those third parties with whom we share it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                            the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review
                            this Privacy Policy periodically for any changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            If you have any questions about this Privacy Policy or our data practices, please contact us:
                        </p>
                        <div className="mt-3 text-gray-700">
                            <p><strong>Email:</strong> nguyendangkhuong96@gmail.com</p>
                            <p><strong>Support Email:</strong> nguyendangkhuong96@gmail.com</p>
                            <p><strong>Website:</strong> https://shop.thetaphoa.com</p>
                        </div>
                    </section>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200">
                    <p className="text-center text-gray-600">
                        © 2024 Thetaphoa. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
