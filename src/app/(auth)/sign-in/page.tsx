'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Display, Text } from '@/components/Typography';
import { Button } from '@/components/Button';

function RPLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="81" height="86" viewBox="0 0 81 86" fill="none" aria-hidden>
      <path d="M1.14355 36.0791C2.20663 37.2867 3.96592 37.9347 5.75 37.2656V37.2646C5.91369 37.204 6.22377 37.0172 6.69434 36.6846C7.15975 36.3556 7.77013 35.8935 8.53027 35.2959C9.67065 34.3993 11.1454 33.1992 12.9668 31.6885L14.9043 30.0742C16.8371 28.467 20.7226 25.2734 25.0732 21.7402L29.5234 18.1396C31.0408 16.9204 33.235 15.1064 34.4297 14.1289V14.1279C36.3552 12.5143 37.6888 11.453 38.6367 10.7949C39.1106 10.4659 39.4919 10.2349 39.8057 10.0859C40.1184 9.93743 40.3734 9.86526 40.5918 9.86523C40.729 9.86523 40.8885 9.90618 41.0801 9.98633C41.2726 10.0669 41.506 10.1914 41.792 10.3682C42.3638 10.7216 43.161 11.2923 44.292 12.1621C46.5554 13.9029 50.1704 16.8542 56.0273 21.6943C57.3846 22.8073 59.9324 24.9202 61.748 26.3564L61.749 26.3574C65.5188 29.422 65.79 29.6402 70.0752 33.166C71.8383 34.6036 73.7878 36.1468 74.3809 36.5781C76.468 38.0567 78.9828 37.6797 80.3184 35.6895L80.3193 35.6875C80.5857 35.3013 80.7301 35.0198 80.8027 34.6787C80.8764 34.3328 80.8784 33.9159 80.8379 33.2529C80.7712 32.386 80.633 31.8323 80.1436 31.2002C79.6443 30.5555 78.778 29.8272 77.2295 28.6318L77.2256 28.6289C76.3288 27.8952 73.4332 25.5948 70.8262 23.4766L66.1064 19.5977L65.8672 13.2051C65.8129 11.2628 65.7915 9.84398 65.7197 8.80273C65.6476 7.75591 65.5255 7.12093 65.29 6.72852C65.0657 6.35469 64.7267 6.186 64.1475 6.11328C63.5578 6.03932 62.7582 6.06934 61.6367 6.06934C60.6111 6.06934 59.8422 6.07547 59.2588 6.1377C58.6745 6.20003 58.2987 6.31655 58.043 6.51758C57.7914 6.71558 57.6361 7.01246 57.5322 7.48438C57.4277 7.95913 57.3786 8.59041 57.3242 9.44043L57.1455 12.1582L55.4268 10.8691C54.1483 9.89038 51.868 8.07197 43.9775 1.67285C43.4402 1.21581 42.6341 0.678948 42.2363 0.466797C41.7744 0.236836 41.1221 0.12352 40.4561 0.136719C39.2922 0.25648 38.8369 0.456055 38.6494 0.546875C38.4416 0.664375 37.8625 1.09044 37.085 1.69141C36.3098 2.29057 35.3477 3.05597 34.3857 3.8418C32.4886 5.41372 30.4518 7.07034 29.9062 7.47949C28.9053 8.2371 26.3861 10.323 20.2568 15.3945C18.4413 16.8849 16.5396 18.4337 15.9941 18.8428C15.4816 19.2198 13.1533 21.1151 10.8193 23.042C8.486 24.9414 5.36859 27.5161 3.87598 28.7373C3.11802 29.3466 2.38808 29.9751 1.81738 30.4951C1.53193 30.7552 1.28691 30.9881 1.09863 31.1768C1.00314 31.2725 0.924216 31.3554 0.862305 31.4238L0.729492 31.584C-0.273135 33.1231 0.0816118 34.8725 1.14355 36.0791Z" fill="#00875A" stroke="#00875A" strokeWidth="0.271196"/>
      <path d="M40.6172 31.895C42.2839 31.895 43.8332 32.394 45.1279 33.2476C43.5852 33.3493 42.3653 34.6322 42.3652 36.2007C42.3652 37.8355 43.6904 39.1614 45.3252 39.1616C46.7067 39.1616 47.8639 38.2139 48.1904 36.9341C48.599 37.9092 48.8251 38.9796 48.8252 40.103C48.8252 44.6363 45.1505 48.3119 40.6172 48.312C36.0838 48.312 32.4092 44.6364 32.4092 40.103C32.4094 35.5698 36.084 31.895 40.6172 31.895Z" fill="#1A1A1A"/>
      <circle cx="40.618" cy="40.1048" r="15.5938" stroke="#1A1A1A" strokeWidth="4.06795"/>
      <path d="M39.7207 85.4229C40.5239 85.5677 41.1829 85.5358 42.1104 85.1562C43.0482 84.7724 44.2579 84.035 46.1572 82.7598V82.7588C57.4738 75.2054 64.9637 66.0079 68.3965 55.5205C69.857 51.0308 70.3155 48.4124 70.5049 43.6787C70.5728 41.6828 70.5992 40.5792 70.5557 39.9131C70.534 39.581 70.4959 39.3671 70.4404 39.21C70.3863 39.0566 70.3141 38.9507 70.2139 38.8379C69.6159 38.1654 68.721 38.2277 68.2871 38.875C68.1909 39.0323 68.0798 39.3526 67.9785 39.7578C67.8783 40.1588 67.7909 40.6276 67.7373 41.0693C67.4923 43.1735 66.511 46.5773 65.4482 48.8936C62.9398 54.5091 57.8189 59.7664 52.2314 62.4648C48.5494 64.2371 45.3019 64.9463 40.7549 64.9463C35.6507 64.9717 31.6625 64.0395 27.9014 61.9443L27.1523 61.5098C24.87 60.1206 24.6106 59.8949 24.3389 59.6504C21.0786 56.7841 18.7689 54.2173 17.0879 51.3975C15.4067 48.5771 14.3581 45.5105 13.6104 41.6494C13.0772 39.3613 13.007 39.1278 12.9443 38.9531L12.8066 38.6543C12.618 38.431 12.3147 38.3304 11.9766 38.3613C11.6395 38.3922 11.2836 38.5538 11.0225 38.8398C10.7424 39.3671 10.7043 39.581 10.6826 39.9131C10.6391 40.5793 10.6655 41.6834 10.7334 43.6797C11.0579 52.9803 13.8418 60.7919 19.4941 68.4727C20.4639 69.7812 22.3169 71.8354 24.2715 73.834C26.2265 75.833 28.2755 77.7675 29.6377 78.833C31.316 80.1586 33.5974 81.7627 35.585 83.0596C36.5786 83.7079 37.4974 84.2793 38.2295 84.6992C38.9134 85.0806 39.6136 85.4032 39.7197 85.4238Z" fill="#00875A" stroke="#00875A" strokeWidth="0.271196"/>
    </svg>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message || 'Invalid login credentials');
      return;
    }
    router.push('/transactions');
  }

  const onForgot = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Forgot Password pressed');
  };
  const onGoogle = () => console.log('Sign in with Google pressed');
  const onSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Sign up pressed');
  };

  return (
    <div className="min-h-screen grid grid-cols-2 bg-[#FAFAFA]">
      {/* LEFT half – hero (no container) */}
      <section className="flex items-center justify-center">
        <div className="max-w-[560px] w-full px-8">
          <Display
            as="h1"
            size="xl"
            weight="bold"
            color="heading"
            /* enforce figma numbers */
            className="tracking-[0.6px] text-[60px] leading-[72px]"
          >
            Your Real Estate
            <br /> Business,
            <br /> Simplified.
          </Display>

          <Text as="p" size="lg" color="muted" className="mt-4">
            Track your deals, income, and prospecting in one clean hub. No CRM.
            No spreadsheets. Just clarity.
          </Text>
        </div>
      </section>

      {/* RIGHT half – plain white, 360px column centered */}
      <section className="flex items-center justify-center bg-white">
        <div className="w-[360px] px-6">
          {/* Logo + product copy */}
          <div className="flex flex-col items-center gap-2">
            <RPLogo />
            <Display as="h2" size="sm" weight="bold" color="heading" className="text-center">
              RealPeep
            </Display>
            <Text as="div" size="md" color="muted" className="text-center -mt-1">
              Deals, commissions, prospecting.
              <br />
              One Platform
            </Text>
          </div>

          {/* Form */}
          <form onSubmit={onLogin} className="mt-8 space-y-4">
            <div>
              <Text as="label" size="sm" weight="medium" color="heading" className="block mb-1">
                Email
              </Text>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-10 w-full rounded-xl px-3 border border-gray-200 outline-none text-body-md placeholder-gray-300 focus:border-gray-300"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <Text as="label" size="sm" weight="medium" color="heading" className="block mb-1">
                Password
              </Text>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 w-full rounded-xl px-3 border border-gray-200 outline-none text-body-md placeholder-gray-300 focus:border-gray-300"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-body-sm text-gray-600">
                <input type="checkbox" onClick={() => console.log('Remember for 30 days pressed')} />
                Remember for 30 days
              </label>
              <button onClick={onForgot} className="text-body-sm text-primary-700 hover:underline">
                Forgot Password
              </button>
            </div>

            {error && (
              <div className="rounded-lg border border-error-200 bg-error-50 text-error-700 text-sm px-3 py-2">
                {error}
              </div>
            )}

            <Button hierarchy="primary" size="md" type="submit" disabled={loading} className="w-full">
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>

            <button
              type="button"
              onClick={onGoogle}
              className="w-full h-10 rounded-xl border border-gray-200 grid place-items-center text-body-md text-gray-700 hover:bg-gray-50"
            >
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-5 h-5 rounded-full border border-gray-300" aria-hidden />
                Sign in with Google
              </span>
            </button>
          </form>

          {/* Bottom copy */}
          <Text as="p" size="sm" color="muted" className="text-center mt-8">
            Don’t have an account?{' '}
            <a href="#" onClick={onSignUp} className="text-primary-700 hover:underline">
              Sign up
            </a>
          </Text>

          <Text as="p" size="xs" color="muted" className="text-center mt-4">
            By signing in, you agree to RealPeep’s <a className="underline">Terms of Service</a> and{' '}
            <a className="underline">Privacy Policy</a>.
          </Text>
        </div>
      </section>
    </div>
  );
}
