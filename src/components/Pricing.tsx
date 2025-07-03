import React, { useState } from 'react';
import { 
  CreditCard, 
  Star, 
  Check, 
  Crown, 
  Zap,
  Users,
  School,
  Heart,
  Sparkles,
  Trophy,
  Gift,
  ArrowRight,
  Shield
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { PricingPlan, Subscription, PaymentRecord } from '../types';

export const Pricing: React.FC = () => {
  const { currentUser, userCredits, setUserCredits, subscription, setSubscription, paymentHistory, setPaymentHistory } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');

  const pricingPlans: PricingPlan[] = [
    {
      id: 'pay_per_use',
      name: 'Pay Per Question',
      price: 10,
      currency: 'KES',
      billing: 'per_use',
      features: [
        'KES 10 per AI homework question',
        'Photo upload support',
        'Instant AI responses',
        'Step-by-step explanations',
        'All subjects covered',
        'No monthly commitment'
      ],
      questionsIncluded: 1
    },
    {
      id: 'family_monthly',
      name: 'Family Monthly',
      price: 500,
      currency: 'KES',
      billing: 'monthly',
      features: [
        'Unlimited AI homework questions',
        'Photo upload support',
        'Priority AI responses',
        'Detailed explanations',
        'Progress tracking',
        'Multiple children support',
        'Parent-teacher messaging',
        'Meeting scheduling',
        'Report card access'
      ],
      questionsIncluded: -1, // Unlimited
      popular: true
    },
    {
      id: 'family_yearly',
      name: 'Family Yearly',
      price: 5000,
      currency: 'KES',
      billing: 'yearly',
      features: [
        'Everything in Family Monthly',
        '2 months FREE (save KES 1,000)',
        'Premium AI tutor features',
        'Advanced progress analytics',
        'Priority customer support',
        'Early access to new features',
        'Homework planning tools',
        'Study schedule optimization'
      ],
      questionsIncluded: -1 // Unlimited
    },
    {
      id: 'school_partnership',
      name: 'School Partnership',
      price: 15000,
      currency: 'KES',
      billing: 'monthly',
      features: [
        'Unlimited access for all students',
        'Teacher dashboard & analytics',
        'Bulk report card uploads',
        'School calendar integration',
        'Parent-teacher communication',
        'Custom branding options',
        'Admin management tools',
        'Priority support & training',
        'Data export capabilities'
      ],
      questionsIncluded: -1, // Unlimited
      schoolPlan: true
    }
  ];

  const handlePurchase = (plan: PricingPlan) => {
    setSelectedPlan(plan.id);
    setShowPaymentModal(true);
  };

  const handleBuyCredits = (amount: number) => {
    const creditPackages = [
      { credits: 5, price: 45, savings: 5 },
      { credits: 10, price: 80, savings: 20 },
      { credits: 25, price: 180, savings: 70 },
      { credits: 50, price: 300, savings: 200 }
    ];
    
    const selectedPackage = creditPackages.find(pkg => pkg.credits === amount);
    if (selectedPackage) {
      setSelectedPlan(`credits_${amount}`);
      setShowPaymentModal(true);
    }
  };

  const processPayment = () => {
    // Simulate payment processing
    const plan = pricingPlans.find(p => p.id === selectedPlan);
    
    if (plan) {
      // Create payment record
      const paymentRecord: PaymentRecord = {
        id: Date.now().toString(),
        userId: currentUser?.id || '',
        amount: plan.price,
        currency: plan.currency,
        type: plan.billing === 'per_use' ? 'credits' : 'subscription',
        description: `${plan.name} - ${plan.billing}`,
        timestamp: new Date(),
        status: 'completed',
        paymentMethod: paymentMethod
      };

      setPaymentHistory([...paymentHistory, paymentRecord]);

      if (plan.billing === 'per_use') {
        // Add credits
        setUserCredits(userCredits + (plan.questionsIncluded || 1));
      } else {
        // Create subscription
        const newSubscription: Subscription = {
          id: Date.now().toString(),
          userId: currentUser?.id || '',
          plan: plan.id as any,
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + (plan.billing === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000),
          price: plan.price,
          currency: plan.currency,
          features: plan.features,
          questionsRemaining: plan.questionsIncluded === -1 ? undefined : plan.questionsIncluded
        };
        setSubscription(newSubscription);
      }
    }

    setShowPaymentModal(false);
    setSelectedPlan(null);
  };

  const getCurrentPlanStatus = () => {
    if (subscription && subscription.status === 'active') {
      return subscription;
    }
    return null;
  };

  const currentPlan = getCurrentPlanStatus();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white animate-bounce-gentle">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Pricing & Subscriptions 💳</h2>
              <p className="text-xl text-purple-200 font-bold">
                Choose the perfect plan for your family! ✨
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Crown className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
          <Star className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
          <Trophy className="w-6 h-6 text-pink-300 fill-current animate-pulse" />
        </div>
      </div>

      {/* Current Plan Status */}
      {currentPlan && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">Current Plan Status 🌟</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200">
              <h4 className="font-bold text-gray-800 mb-2">Active Plan</h4>
              <p className="text-green-600 font-black text-lg capitalize">
                {currentPlan.plan.replace('_', ' ')}
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border-2 border-blue-200">
              <h4 className="font-bold text-gray-800 mb-2">Valid Until</h4>
              <p className="text-blue-600 font-black text-lg">
                {currentPlan.endDate.toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
              <h4 className="font-bold text-gray-800 mb-2">Questions</h4>
              <p className="text-purple-600 font-black text-lg">
                {currentPlan.questionsRemaining === undefined ? 'Unlimited' : `${currentPlan.questionsRemaining} left`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Credits Display */}
      {currentUser?.role === 'parent' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800">Your Credits ⚡</h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-yellow-600">{userCredits}</div>
              <p className="text-sm font-bold text-gray-600">Available Credits</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { credits: 5, price: 45, savings: 5 },
              { credits: 10, price: 80, savings: 20 },
              { credits: 25, price: 180, savings: 70 },
              { credits: 50, price: 300, savings: 200 }
            ].map((pkg) => (
              <button
                key={pkg.credits}
                onClick={() => handleBuyCredits(pkg.credits)}
                className="bg-gradient-to-br from-yellow-400 to-orange-400 text-white rounded-2xl p-4 hover:from-yellow-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <div className="text-2xl font-black">{pkg.credits}</div>
                <div className="text-sm font-bold">Credits</div>
                <div className="text-lg font-black">KES {pkg.price}</div>
                <div className="text-xs bg-white bg-opacity-20 rounded-full px-2 py-1 mt-2">
                  Save KES {pkg.savings}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan) => {
          const isPopular = plan.popular;
          const isSchoolPlan = plan.schoolPlan;
          
          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-8 shadow-xl border-4 transition-all duration-300 transform hover:scale-105 relative ${
                isPopular 
                  ? 'border-purple-400 ring-4 ring-purple-200' 
                  : isSchoolPlan
                  ? 'border-blue-400 ring-4 ring-blue-200'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-2xl font-bold text-sm flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  Most Popular
                </div>
              )}
              
              {isSchoolPlan && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-4 py-2 rounded-2xl font-bold text-sm flex items-center gap-2">
                  <School className="w-4 h-4" />
                  For Schools
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg ${
                  isPopular 
                    ? 'bg-gradient-to-br from-purple-400 to-pink-400' 
                    : isSchoolPlan
                    ? 'bg-gradient-to-br from-blue-400 to-indigo-400'
                    : 'bg-gradient-to-br from-green-400 to-emerald-400'
                }`}>
                  {isPopular ? (
                    <Crown className="w-8 h-8 text-white" />
                  ) : isSchoolPlan ? (
                    <School className="w-8 h-8 text-white" />
                  ) : (
                    <CreditCard className="w-8 h-8 text-white" />
                  )}
                </div>
                
                <h3 className="text-2xl font-black text-gray-800 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-black text-gray-800">KES {plan.price}</span>
                  <span className="text-gray-600 font-semibold">
                    /{plan.billing === 'per_use' ? 'question' : plan.billing === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                
                {plan.billing === 'yearly' && (
                  <div className="mt-2 bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save KES 1,000/year! 🎉
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isPopular 
                        ? 'bg-purple-400' 
                        : isSchoolPlan
                        ? 'bg-blue-400'
                        : 'bg-green-400'
                    }`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePurchase(plan)}
                className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${
                  isPopular 
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500' 
                    : isSchoolPlan
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500'
                    : 'bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500'
                }`}
              >
                {plan.billing === 'per_use' ? 'Buy Credits' : 'Choose Plan'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Secure Payment 🔒</h3>
              <p className="text-gray-600 font-medium">Complete your purchase safely</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-green-400 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="mpesa"
                      checked={paymentMethod === 'mpesa'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-green-500"
                    />
                    <span className="font-semibold">M-Pesa 📱</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-blue-400 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-blue-500"
                    />
                    <span className="font-semibold">Credit/Debit Card 💳</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={processPayment}
                className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-2xl font-bold hover:from-green-500 hover:to-emerald-600 transition-all duration-300"
              >
                Complete Payment ✨
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 bg-gray-400 text-white py-3 rounded-2xl font-bold hover:bg-gray-500 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Partnership Information */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-blue-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center">
            <School className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-black text-gray-800">School Partnerships 🏫</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">Partner Benefits</h4>
            <div className="space-y-3">
              {[
                'Bulk pricing for entire school',
                'Custom branding and white-label options',
                'Advanced analytics and reporting',
                'Priority support and training',
                'Integration with existing school systems',
                'Dedicated account manager'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Get Started</h4>
            <p className="text-gray-700 font-medium mb-4">
              Contact our education team to discuss partnership opportunities and custom pricing for your school.
            </p>
            <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-6 py-3 rounded-2xl font-bold hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 flex items-center gap-2">
              Contact Sales Team
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};