import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - Thetaphoa',
    description: 'Terms of Service for Thetaphoa application',
};

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>

                <div className="text-sm text-gray-600 mb-8">
                    <p><strong>Last Updated:</strong> December 27, 2024</p>
                </div>

                <div className="prose prose-gray max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            By accessing and using Thetaphoa ("the Service"), you accept and agree to be bound by the terms and
                            provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Thetaphoa is a shop management application that provides tools for managing products, categories,
                            orders, and inventory. The Service may include integration with third-party platforms including but
                            not limited to TikTok for content management and distribution purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            To access certain features of the Service, you may be required to create an account. You agree to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Provide accurate, current, and complete information during registration</li>
                            <li>Maintain the security of your password and account</li>
                            <li>Notify us immediately of any unauthorized use of your account</li>
                            <li>Accept responsibility for all activities that occur under your account</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. TikTok Integration</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Our Service may integrate with TikTok's platform. When using TikTok integration features:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>You must comply with TikTok's Terms of Service and Community Guidelines</li>
                            <li>You authorize us to access your TikTok account data as necessary for the Service</li>
                            <li>You understand that TikTok's terms and policies govern your use of their platform</li>
                            <li>We are not responsible for any changes to TikTok's API or services</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. User Content</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            You retain all rights to any content you submit, post, or display on or through the Service.
                            By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use,
                            reproduce, and distribute such content in connection with the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Prohibited Conduct</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            You agree not to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Use the Service for any illegal purpose or in violation of any laws</li>
                            <li>Violate or infringe upon the rights of others</li>
                            <li>Transmit any harmful or malicious code</li>
                            <li>Attempt to gain unauthorized access to any part of the Service</li>
                            <li>Interfere with or disrupt the Service or servers</li>
                            <li>Use automated means to access the Service without permission</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Intellectual Property</h2>
                        <p className="text-gray-700 leading-relaxed">
                            The Service and its original content, features, and functionality are owned by Thetaphoa and are
                            protected by international copyright, trademark, patent, trade secret, and other intellectual
                            property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Termination</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may terminate or suspend your account and access to the Service immediately, without prior
                            notice or liability, for any reason, including without limitation if you breach the Terms.
                            Upon termination, your right to use the Service will immediately cease.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Disclaimer of Warranties</h2>
                        <p className="text-gray-700 leading-relaxed">
                            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed
                            or implied, regarding the Service, including but not limited to implied warranties of merchantability,
                            fitness for a particular purpose, or non-infringement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Limitation of Liability</h2>
                        <p className="text-gray-700 leading-relaxed">
                            In no event shall Thetaphoa, its directors, employees, or agents be liable for any indirect,
                            incidental, special, consequential, or punitive damages arising out of or relating to your use
                            of the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We reserve the right to modify or replace these Terms at any time. We will provide notice of
                            any changes by posting the new Terms on this page and updating the "Last Updated" date.
                            Your continued use of the Service after any changes constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <div className="mt-3 text-gray-700">
                            <p><strong>Email:</strong> nguyendangkhuong96@gmail.com</p>
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
