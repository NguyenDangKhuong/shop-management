const en = {
    // Landing
    'landing.heroGreeting': "Hello, I'm",
    'landing.heroName': 'Khuong',
    'landing.heroSub': 'I build accessible web experiences.',
    'landing.viewProjects': 'View Projects',
    'landing.heroSection': 'Hero Section',
    'landing.about': 'About Me',
    'landing.aboutText':
        "I'm Khuong, a front-end developer based in Ho Chi Minh City. I'm passionate about creating intuitive, dynamic user experiences and clean, efficient code. Currently focused on the React ecosystem.",
    'landing.present': 'Present',
    'landing.skiller': 'Skiller',
    'landing.techStack': 'Tech Stack',
    'landing.featuredProject': 'Featured Project: E-commerce App',
    'landing.liveDemo': 'Live Demo',
    'landing.adminPanel': 'Admin Panel',
    'landing.contact': 'Contact',
    'landing.performanceStats': 'Performance Stats',
    'landing.darkMode': 'Dark Mode',
    'landing.footer': '© 2026 TheTapHoa. All rights reserved.',
    'landing.privacy': 'Privacy Policy',
    'landing.terms': 'Terms of Service',
    'landing.login': 'Login',

    // Login
    'login.title': 'Welcome Back',
    'login.subtitle': 'Please enter your details to sign in',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.rememberMe': 'Remember me',
    'login.forgotPassword': 'Forgot Password?',
    'login.submit': 'LOGIN',
    'login.loading': 'LOGGING IN...',
    'login.noAccount': "Don't have an account?",
    'login.signUp': 'Sign up',
    'login.networkError': 'An error occurred during login',

    // Register
    'register.title': 'Create Account',
    'register.subtitle': 'Sign up to get started',
    'register.name': 'Full Name',
    'register.email': 'Email Address',
    'register.password': 'Password',
    'register.confirmPassword': 'Confirm Password',
    'register.submit': 'SIGN UP',
    'register.loading': 'CREATING ACCOUNT...',
    'register.hasAccount': 'Already have an account?',
    'register.login': 'Login',
    'register.passwordMismatch': 'Passwords do not match!',
    'register.networkError': 'An error occurred during registration',

    // Forgot Password
    'forgot.title': 'Forgot Password',
    'forgot.subtitle': "Enter your email and we'll send you a reset link",
    'forgot.email': 'Email Address',
    'forgot.submit': 'SEND RESET LINK',
    'forgot.loading': 'SENDING...',
    'forgot.success': "Check your email! We've sent you a password reset link.",
    'forgot.successHint':
        "Didn't receive the email? Check your spam folder or try again.",
    'forgot.backToLogin': '← Back to Login',
    'forgot.rememberPassword': 'Remember your password?',
    'forgot.login': 'Login',
    'forgot.networkError': 'An error occurred. Please try again.',

    // Reset Password
    'reset.title': 'Reset Password',
    'reset.subtitle': 'Enter your new password below',
    'reset.newPassword': 'New Password',
    'reset.confirmPassword': 'Confirm Password',
    'reset.submit': 'RESET PASSWORD',
    'reset.loading': 'RESETTING...',
    'reset.success': 'Password reset successfully! Redirecting to login...',
    'reset.invalidLink': 'Invalid Reset Link',
    'reset.invalidLinkText':
        'This password reset link is invalid or has expired.',
    'reset.requestNew': 'Request a new reset link →',
    'reset.backToLogin': '← Back to Login',
    'reset.passwordMismatch': 'Passwords do not match',
    'reset.passwordTooShort': 'Password must be at least 6 characters',
    'reset.networkError': 'An error occurred. Please try again.',
}

export default en
export type TranslationKeys = keyof typeof en
