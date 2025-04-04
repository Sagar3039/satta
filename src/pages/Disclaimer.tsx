
import MainLayout from "@/layout/MainLayout";

const Disclaimer = () => {
  return (
    <MainLayout>
      <section className="py-24 relative">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black z-0"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                <span className="gold-text">Disclaimer</span>
              </h1>
              <p className="text-gray-400">
                Important information about using our services
              </p>
            </div>
            
            <div className="bg-secondary/30 border border-white/10 rounded-xl p-8">
              <div className="space-y-6 text-gray-300">
                <p>
                  Welcome to SATTA KING DELHI. Please read this disclaimer carefully before using our website or services.
                </p>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Information Purposes Only</h3>
                  <p>
                    The content provided on this website is for information and entertainment purposes only. The information is not intended to be and does not constitute financial advice, investment advice, or any other advice.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Legal Considerations</h3>
                  <p>
                    Gambling laws and regulations vary by location. It is your responsibility to verify and comply with all applicable laws in your jurisdiction before using any information on this website. We make no representations or warranties about the legality of gambling in any jurisdiction.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Risk Acknowledgment</h3>
                  <p>
                    Gambling involves financial risk and can be addictive. Never gamble with funds that you cannot afford to lose. If you believe you may have a gambling problem, please seek help from appropriate counseling services.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Accuracy of Information</h3>
                  <p>
                    While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, reliability, completeness, or timeliness of the content on this website. Any reliance you place on such information is strictly at your own risk.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Age Restrictions</h3>
                  <p>
                    This website and its services are intended for users who are 18 years of age or older, or the legal age for gambling in your jurisdiction, whichever is higher. By using this website, you confirm that you meet these age requirements.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Third-Party Links</h3>
                  <p>
                    Our website may contain links to third-party websites. We have no control over the content, privacy policies, or practices of these sites and assume no responsibility for them.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Changes to Disclaimer</h3>
                  <p>
                    We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after any changes indicates your acceptance of the modified disclaimer.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Contact Information</h3>
                  <p>
                    If you have any questions about this disclaimer, please contact us at +91 62965 07452.
                  </p>
                </div>
                
                <p className="text-center text-gray-400 mt-8">
                  Last updated: April 4, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Disclaimer;
