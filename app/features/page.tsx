import styles from "./page.module.css";

export default function FeaturesPage() {
  return (
    <section className={`space-y-8 ${styles.textMain}`}>
      <div>
        <h1 className="text-4xl font-bold mb-3">Features & Organization</h1>
        <p className={`text-lg ${styles.textMuted}`}>Manual Organization Control</p>
        <p className={styles.textMuted}>CloudVault puts you in complete control of how your files are organized. Tag and categorize each file exactly how you want it, using our premade tags or creating your own custom tags for perfect organization.</p>
        <p className={`mt-4 ${styles.textMuted}`}>No algorithms deciding for you - just pure, customizable organization that works the way you think. Your files, your rules, your way.</p>
      </div>

      <div className={styles.section}>
        <h2 className={`text-3xl font-bold mb-6 ${styles.sectionTitle}`}>Core Features</h2>
        <div className={styles.coreFeatureGrid}>
          <div className={styles.coreFeatureCard}>
            <div className={styles.featureIcon}>🏷️</div>
            <h3 className={`text-xl font-semibold mb-3 ${styles.featureTitle}`}>Custom Tagging</h3>
            <p className={`mb-3 ${styles.textMuted}`}><strong>Manual:</strong> Choose from premade tags or create custom ones that match your workflow perfectly.</p>
            <p className={styles.aiNote}><strong>AI Solution:</strong> Our AI automatically analyzes each file and generates relevant tags based on content, file type, and context. A vacation photo gets tagged with "travel," "beach," "summer" - no effort required.</p>
          </div>

          <div className={styles.coreFeatureCard}>
            <div className={styles.featureIcon}>🔍</div>
            <h3 className={`text-xl font-semibold mb-3 ${styles.featureTitle}`}>Smart Search</h3>
            <p className={`mb-3 ${styles.textMuted}`}><strong>Problem:</strong> You know what file you need, but can't remember its name or where you saved it.</p>
            <p className={styles.aiNote}><strong>AI Solution:</strong> Search using natural language like "my presentation about climate change from last month" or "video of birthday party." The AI understands context and finds your file instantly.</p>
          </div>

          <div className={styles.coreFeatureCard}>
            <div className={styles.featureIcon}>📂</div>
            <h3 className={`text-xl font-semibold mb-3 ${styles.featureTitle}`}>Smart Categorization</h3>
            <p className={`mb-3 ${styles.textMuted}`}><strong>Problem:</strong> Your files are scattered and disorganized, making it hard to see what you have.</p>
            <p className={styles.aiNote}><strong>AI Solution:</strong> Files are automatically sorted into intelligent categories like "School Projects," "Creative Work," "Personal," etc. The AI learns your patterns and improves organization over time.</p>
          </div>

          <div className={styles.coreFeatureCard}>
            <div className={styles.featureIcon}>👁️</div>
            <h3 className={`text-xl font-semibold mb-3 ${styles.featureTitle}`}>Content Recognition</h3>
            <p className={`mb-3 ${styles.textMuted}`}><strong>Problem:</strong> Finding specific content within images or documents is nearly impossible without opening each file.</p>
            <p className={styles.aiNote}><strong>AI Solution:</strong> The AI analyzes image content, reads text in documents, and extracts metadata from videos. Search for "files with dogs" or "PDFs about physics" and get accurate results.</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={`text-3xl font-bold mb-6 ${styles.sectionTitle}`}>Complete Feature Set</h2>
        <div className={styles.formatGrid}>
          <div className={styles.formatCard}>
            <h3 className={`font-semibold mb-2 ${styles.formatTitle}`}>Images & Photos</h3>
            <p className={styles.textMuted}>JPEG, PNG, GIF, SVG, WebP, RAW formats. Full resolution preservation with smart compression options.</p>
          </div>

          <div className={styles.formatCard}>
            <h3 className={`font-semibold mb-2 ${styles.formatTitle}`}>Videos</h3>
            <p className={styles.textMuted}>MP4, MOV, AVI, MKV, WebM. Stream directly from cloud without downloading.</p>
          </div>

          <div className={styles.formatCard}>
            <h3 className={`font-semibold mb-2 ${styles.formatTitle}`}>Documents</h3>
            <p className={styles.textMuted}>PDF, Word, Excel, PowerPoint, text files. Preview and search within documents.</p>
          </div>

          <div className={styles.formatCard}>
            <h3 className={`font-semibold mb-2 ${styles.formatTitle}`}>3D Models</h3>
            <p className={styles.textMuted}>OBJ, FBX, STL, GLTF, Blender files. Perfect for designers and 3D artists.</p>
          </div>

          <div className={styles.formatCard}>
            <h3 className={`font-semibold mb-2 ${styles.formatTitle}`}>Code Files</h3>
            <p className={styles.textMuted}>Any programming language. Syntax-highlighted preview for easy viewing.</p>
          </div>

          <div className={styles.formatCard}>
            <h3 className={`font-semibold mb-2 ${styles.formatTitle}`}>Archives</h3>
            <p className={styles.textMuted}>ZIP, RAR, 7Z, TAR. Browse contents without extracting.</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={`text-3xl font-bold mb-6 ${styles.sectionTitle}`}>Why Buy CloudVault Over Others?</h2>
        <div className={styles.comparisonTable}>
          <div className={styles.comparisonRow}>
            <div className={styles.comparisonLabel}>Feature</div>
            <div className={`${styles.comparisonCol} ${styles.traditional}`}>Traditional Cloud Storage</div>
            <div className={`${styles.comparisonCol} ${styles.cloudvault}`}>CloudVault</div>
          </div>

          <div className={styles.comparisonRow}>
            <div className={styles.comparisonLabel}>Organization</div>
            <div className={styles.comparisonCol}>✗ Manual organization required</div>
            <div className={styles.comparisonCol}>✓ AI organizes everything automatically</div>
          </div>

          <div className={styles.comparisonRow}>
            <div className={styles.comparisonLabel}>Search</div>
            <div className={styles.comparisonCol}>✗ Basic search by filename only</div>
            <div className={styles.comparisonCol}>✓ Smart search understands context</div>
          </div>

          <div className={styles.comparisonRow}>
            <div className={styles.comparisonLabel}>File Support</div>
            <div className={styles.comparisonCol}>✗ Limited file type support</div>
            <div className={styles.comparisonCol}>✓ All file types supported</div>
          </div>

          <div className={styles.comparisonRow}>
            <div className={styles.comparisonLabel}>Pricing</div>
            <div className={styles.comparisonCol}>✗ Expensive for large storage</div>
            <div className={styles.comparisonCol}>✓ Affordable pricing for students</div>
          </div>

          <div className={styles.comparisonRow}>
            <div className={styles.comparisonLabel}>Content Understanding</div>
            <div className={styles.comparisonCol}>✗ No content understanding</div>
            <div className={styles.comparisonCol}>✓ AI understands file content</div>
          </div>
        </div>

        <div className={styles.bottomLine}>
          <p className={styles.textMuted}>
            <strong>The Bottom Line:</strong> CloudVault saves you hours of organization time and makes finding files effortless. While others offer storage, we offer intelligence. That's the difference between having a closet and having a smart assistant that knows exactly where everything is.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={`text-3xl font-bold mb-6 ${styles.sectionTitle}`}>Pricing Plans</h2>
        <p className={`mb-6 ${styles.textMuted}`}>Our pricing follows a repeated addition pattern - each tier doubles from the previous one, starting at just $2/month. Simple, predictable, and affordable.</p>
        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <h3 className={`font-semibold mb-2 ${styles.pricingTitle}`}>Starter</h3>
            <div className={styles.price}>$2<span className={styles.period}>/mo</span></div>
          </div>
          <div className={styles.pricingCard}>
            <h3 className={`font-semibold mb-2 ${styles.pricingTitle}`}>Pro</h3>
            <div className={styles.price}>$4<span className={styles.period}>/mo</span></div>
          </div>
          <div className={styles.pricingCard}>
            <h3 className={`font-semibold mb-2 ${styles.pricingTitle}`}>Premium</h3>
            <div className={styles.price}>$8<span className={styles.period}>/mo</span></div>
          </div>
          <div className={styles.pricingCard}>
            <h3 className={`font-semibold mb-2 ${styles.pricingTitle}`}>Enterprise</h3>
            <div className={styles.price}>$16<span className={styles.period}>/mo</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
