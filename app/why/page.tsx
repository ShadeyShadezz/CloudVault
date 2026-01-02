import styles from "./page.module.css";

export default function WhyPage() {
  return (
    <section className={`space-y-8 ${styles.textMain}`}>
      <div>
        <h1 className="text-4xl font-bold mb-3">Why CloudVault?</h1>
        <p className={`text-lg ${styles.textMuted}`}>Traditional cloud storage fails when you need to manage diverse file types. CloudVault uses AI to understand your content, not just store it.</p>
      </div>

      <div className={styles.section}>
        <h2 className={`text-3xl font-bold mb-6 ${styles.sectionTitle}`}>The CloudVault Difference</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3 className={`text-xl font-semibold mb-2 ${styles.featureTitle}`}>Universal File Support</h3>
            <p className={styles.textMuted}>Upload any file type without worrying about compatibility. Images, videos, 3D objects, PDFs, documents, code files - everything is supported out of the box.</p>
          </div>

          <div className={styles.featureCard}>
            <h3 className={`text-xl font-semibold mb-2 ${styles.featureTitle}`}>AI-Powered Organization</h3>
            <p className={styles.textMuted}>Our AI automatically tags and categorizes your files by content, type, and context. No more manual folder organization or forgotten file locations.</p>
          </div>

          <div className={styles.featureCard}>
            <h3 className={`text-xl font-semibold mb-2 ${styles.featureTitle}`}>Intelligent Search</h3>
            <p className={styles.textMuted}>Find any file instantly with natural language search. Type "my presentation from last week" or "3D model of a car" and get exactly what you need.</p>
          </div>

          <div className={styles.featureCard}>
            <h3 className={`text-xl font-semibold mb-2 ${styles.featureTitle}`}>Secure Storage</h3>
            <p className={styles.textMuted}>End-to-end encryption ensures your files are safe and private. Access them from any device with confidence in their security.</p>
          </div>

          <div className={styles.featureCard}>
            <h3 className={`text-xl font-semibold mb-2 ${styles.featureTitle}`}>Lightning Fast</h3>
            <p className={styles.textMuted}>Upload and access files quickly with our optimized infrastructure. No waiting, no delays - just instant access to your content.</p>
          </div>

          <div className={styles.featureCard}>
            <h3 className={`text-xl font-semibold mb-2 ${styles.featureTitle}`}>Easy Sharing</h3>
            <p className={styles.textMuted}>Share files and folders with teammates, classmates, or clients with simple, customizable permissions. Collaborate without the complexity.</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={`text-3xl font-bold mb-6 ${styles.sectionTitle}`}>Expected Challenges & Solutions</h2>
        <div className={styles.challengeGrid}>
          <div className={styles.challengeCard}>
            <h3 className={`text-lg font-semibold mb-3 ${styles.challengeTitle}`}>Challenge: Large File Uploads</h3>
            <p className={`mb-3 ${styles.textMuted}`}>Uploading large video files, 3D models, and high-resolution images can be slow and prone to failures on unstable connections.</p>
            <p className={styles.solutionText}><strong>Our Approach:</strong> Implement chunked uploads with automatic resume capability, so uploads can continue even after connection interruptions. Show clear progress indicators and allow background uploads.</p>
          </div>

          <div className={styles.challengeCard}>
            <h3 className={`text-lg font-semibold mb-3 ${styles.challengeTitle}`}>Challenge: AI Training & Accuracy</h3>
            <p className={`mb-3 ${styles.textMuted}`}>Training AI models to accurately categorize diverse file types and content requires significant data and computational resources.</p>
            <p className={styles.solutionText}><strong>Our Approach:</strong> Start with pre-trained models for common file types (images, documents, videos) and improve accuracy over time with user feedback. Allow manual corrections that help train the AI.</p>
          </div>

          <div className={styles.challengeCard}>
            <h3 className={`text-lg font-semibold mb-3 ${styles.challengeTitle}`}>Challenge: Storage Costs</h3>
            <p className={`mb-3 ${styles.textMuted}`}>Providing affordable storage while maintaining quality service requires balancing infrastructure costs with user accessibility.</p>
            <p className={styles.solutionText}><strong>Our Approach:</strong> Offer tiered pricing with a generous free tier for students. Use efficient compression for non-critical files and optimize storage through deduplication and smart caching.</p>
          </div>

          <div className={styles.challengeCard}>
            <h3 className={`text-lg font-semibold mb-3 ${styles.challengeTitle}`}>Challenge: User Adoption</h3>
            <p className={`mb-3 ${styles.textMuted}`}>Getting users to switch from familiar platforms like Google Drive or Dropbox requires demonstrating clear value and making migration easy.</p>
            <p className={styles.solutionText}><strong>Our Approach:</strong> Provide easy import tools from other platforms, offer a seamless onboarding experience, and showcase AI features that competitors don't have. Focus on word-of-mouth growth through student communities.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
