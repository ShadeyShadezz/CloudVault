'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type StoredFile = { id: string; name: string; size: number; type: string; dataUrl?: string; tags?: string[]; addedAt?: number };

function uid() { return Math.random().toString(36).slice(2,9); }

function getStorageSize(files: StoredFile[]): number {
  return files.reduce((total, file) => total + (file.dataUrl?.length || 0), 0);
}

function saveFilesToStorage(files: StoredFile[]) {
  const maxSize = 4 * 1024 * 1024;
  const totalSize = getStorageSize(files);
  
  if (totalSize > maxSize) {
    const sorted = [...files].sort((a, b) => (a.addedAt || 0) - (b.addedAt || 0));
    sorted.splice(0, 1);
    return saveFilesToStorage(sorted);
  }
  
  try {
    localStorage.setItem('cv_files', JSON.stringify(files));
    return true;
  } catch {
    return false;
  }
}

export default function ProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai'; text: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editingFileName, setEditingFileName] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    } else if (status === 'authenticated') {
      const raw = localStorage.getItem('cv_files') || '[]';
      setFiles(JSON.parse(raw));
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className={styles.textMuted}>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <section className={styles.deniedSection}>
        <h1 className={styles.deniedTitle}>Access Denied</h1>
        <p className={styles.deniedText}>Please <a href="/auth" className={styles.deniedLink}>sign in</a> to access your vault.</p>
      </section>
    );
  }

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    
    setError('');
    const maxSize = 4 * 1024 * 1024;
    const fileSizeMB = (f.size / (1024 * 1024)).toFixed(2);
    
    if (f.size > maxSize) {
      setError(`File is too large (${fileSizeMB}MB). Maximum file size is 4MB.`);
      return;
    }
    
    setLoading(true);
    
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      try {
        const dataUrl = String(reader.result);
        const item: StoredFile = { 
          id: uid(), 
          name: f.name, 
          size: f.size, 
          type: f.type, 
          dataUrl,
          tags: [],
          addedAt: Date.now()
        };
        const next = [item, ...files];
        
        if (saveFilesToStorage(next)) {
          setFiles(next);
          setSelectedFileId(item.id);
        } else {
          const currentUsage = (getStorageSize(files) / (1024 * 1024)).toFixed(2);
          const available = (4 - parseFloat(currentUsage)).toFixed(2);
          const fileSizeWithNewMB = (getStorageSize(next) / (1024 * 1024)).toFixed(2);
          const stillNeeded = (parseFloat(fileSizeWithNewMB) - 4).toFixed(2);
          setError(`Storage full: ${currentUsage}MB used. Your file (${fileSizeMB}MB) exceeds available space (${available}MB). The app removed old files but still needs ${stillNeeded}MB more. Please remove more files or reduce file size.`);
        }
      } catch (err) {
        setError('Failed to upload file.');
      } finally {
        setLoading(false);
      }
    }, false);
    
    reader.addEventListener('error', () => {
      setError('Failed to read file.');
      setLoading(false);
    }, false);
    
    reader.readAsDataURL(f);
  };

  const addTag = (fileId: string, tag: string) => {
    if (!tag.trim()) return;
    const next = files.map(f => 
      f.id === fileId && !f.tags?.includes(tag)
        ? { ...f, tags: [...(f.tags || []), tag] }
        : f
    );
    saveFilesToStorage(next);
    setFiles(next);
    setTagInput('');
  };

  const removeTag = (fileId: string, tag: string) => {
    const next = files.map(f =>
      f.id === fileId
        ? { ...f, tags: f.tags?.filter(t => t !== tag) || [] }
        : f
    );
    saveFilesToStorage(next);
    setFiles(next);
  };

  const remove = (id: string) => {
    const next = files.filter(f => f.id !== id);
    saveFilesToStorage(next);
    setFiles(next);
    if (selectedFileId === id) setSelectedFileId(null);
  };

  const renameFile = (fileId: string, newName: string) => {
    if (!newName.trim()) return;
    const next = files.map(f =>
      f.id === fileId
        ? { ...f, name: newName.trim() }
        : f
    );
    saveFilesToStorage(next);
    setFiles(next);
    setEditingFileId(null);
    setEditingFileName('');
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');

    // TODO: Connect to AI API here
    // Example: const response = await askAI(userMessage, allTags);
    // For now, placeholder:
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'AI response will appear here once connected. I can help you find files by tags!' 
      }]);
    }, 500);
  };

  const selectedFile = files.find(f => f.id === selectedFileId);
  const isImageOrVideo = selectedFile?.type?.startsWith('image/') || selectedFile?.type?.startsWith('video/');
  const totalSize = getStorageSize(files);
  const allTags = Array.from(new Set(files.flatMap(f => f.tags || [])));

  const userName = session?.user?.email?.split('@')[0] || 'there';

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Your CloudVault</h1>
        <p className={styles.pageSubtitle}>Welcome back, {userName}! Organize and manage your files with custom</p>
        <div className={styles.searchBarWrapper}>
          <input
            type="text"
            placeholder="Search files by name or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBar}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={styles.searchClearBtn}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className={styles.mainLayout}>
        <aside className={styles.sidebar}>
          <div className={styles.storageCard}>
            <div className={styles.storageTitle}>Storage Usage</div>
            <div className={styles.storageBar}>
              <div className={styles.storageUsed} style={{width: `${Math.min((totalSize / (4 * 1024 * 1024)) * 100, 100)}%`}}></div>
            </div>
            <div className={styles.storageText}>{(totalSize / (1024 * 1024)).toFixed(2)} MB used of 20</div>
            <div className={styles.categoriesTitle}>File Categories</div>
            <div className={styles.categories}>
              {allTags.length === 0 ? (
                <div className={styles.noTags}>No tags yet</div>
              ) : (
                <>
                  {allTags.slice(0, 5).map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className={`${styles.categoryTag} ${searchQuery === tag ? styles.active : ''}`}
                    >
                      {tag}
                    </button>
                  ))}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className={styles.clearTagsBtn}
                    >
                      Clear All Tags
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <div className={styles.chatbotCard}>
            <div className={styles.chatbotTitle}>🤖 AI Assistant</div>
            <div className={styles.chatbotMessages}>
              {chatMessages.length === 0 ? (
                <div className={styles.chatbotWelcome}>
                  <p>Ask me about your files!</p>
                  <p className={styles.chatbotHint}>E.g., "Find files tagged with project"</p>
                </div>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div key={idx} className={`${styles.chatMessage} ${styles[msg.role]}`}>
                    <div className={styles.chatMessageContent}>{msg.text}</div>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleChatSubmit} className={styles.chatbotInput}>
              <input
                type="text"
                placeholder="Ask about your files..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className={styles.chatInputField}
              />
              <button type="submit" className={styles.chatSendBtn}>
                Send
              </button>
            </form>
          </div>
        </aside>

        <main className={styles.mainContent}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.uploadSection}>
            <h2 className={styles.uploadTitle}>Upload Files</h2>
            <p className={styles.uploadDescription}>Drop files here or click to browse. All file types supported - You'll name and tag each file.</p>
            <label className={styles.uploadBox}>
              <span className={styles.uploadIcon}>📁</span>
              <span className={styles.uploadText}>Click to browse or drag files</span>
              <input onChange={handle} type="file" className={styles.fileInput} />
            </label>
            {loading && <div className={styles.loadingText}>Uploading...</div>}
          </div>

          <div className={styles.filesSection}>
            {filteredFiles.length === 0 ? (
              <div className={styles.noFilesContainer}>
                <div className={styles.noFilesIcon}>📂</div>
                <div className={styles.noFilesText}>No files found. Upload some files to get started!</div>
              </div>
            ) : (
              <div className={styles.filesGrid}>
                {filteredFiles.map(f => (
                  <div 
                    key={f.id} 
                    className={`${styles.fileCard} ${selectedFileId === f.id ? styles.selectedFileCard : ''}`}
                  >
                    <div className={styles.filePreviewArea} onClick={() => setSelectedFileId(f.id)}>
                      {isImageOrVideo && selectedFile?.id === f.id ? (
                        <>
                          {f.type?.startsWith('image/') && (
                            <img src={f.dataUrl} alt={f.name} className={styles.filePreviewImg} />
                          )}
                          {f.type?.startsWith('video/') && (
                            <video className={styles.filePreviewImg}>
                              <source src={f.dataUrl} type={f.type} />
                            </video>
                          )}
                        </>
                      ) : (
                        <div className={styles.fileIcon}>📄</div>
                      )}
                    </div>
                    <div className={styles.fileNameSection}>
                      {editingFileId === f.id ? (
                        <div className={styles.fileNameEdit}>
                          <input
                            type="text"
                            value={editingFileName}
                            onChange={(e) => setEditingFileName(e.target.value)}
                            className={styles.fileNameInput}
                            autoFocus
                            onBlur={() => renameFile(f.id, editingFileName)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') renameFile(f.id, editingFileName);
                              if (e.key === 'Escape') {
                                setEditingFileId(null);
                                setEditingFileName('');
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className={styles.fileNameWithEdit}>
                          <div className={styles.fileName} title={f.name}>{f.name}</div>
                          <button
                            onClick={() => {
                              setEditingFileId(f.id);
                              setEditingFileName(f.name);
                            }}
                            className={styles.editNameBtn}
                            title="Rename file"
                          >
                            ✎
                          </button>
                        </div>
                      )}
                      <div className={styles.fileSize}>{(f.size / 1024).toFixed(1)} KB</div>
                    </div>
                    <div className={styles.fileTagsBox}>
                      <div className={styles.tagsInputWrapper}>
                        <input 
                          type="text" 
                          placeholder="Add tag..." 
                          value={selectedFileId === f.id ? tagInput : ''}
                          onChange={(e) => {
                            if (selectedFileId === f.id) setTagInput(e.target.value);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && selectedFileId === f.id) {
                              addTag(f.id, tagInput);
                            }
                          }}
                          onFocus={() => setSelectedFileId(f.id)}
                          className={styles.tagInputField}
                        />
                        <button 
                          onClick={() => {
                            setSelectedFileId(f.id);
                            setTimeout(() => addTag(f.id, tagInput), 0);
                          }}
                          className={styles.tagAddBtn}
                        >
                          +
                        </button>
                      </div>
                      <div className={styles.tagsDisplay}>
                        {f.tags?.map(tag => (
                          <span key={tag} className={styles.fileTag}>
                            {tag}
                            <button onClick={() => removeTag(f.id, tag)} className={styles.fileTagRemove}>×</button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.fileActions}>
                      <a href={f.dataUrl} download={f.name} className={styles.downloadLink}>Download</a>
                      <button onClick={() => remove(f.id)} className={styles.deleteLink}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className={styles.statsFooter}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{(totalSize / (1024 * 1024)).toFixed(2)} MB</div>
          <div className={styles.statLabel}>STORAGE USED</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{files.length}</div>
          <div className={styles.statLabel}>TOTAL FILES</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{allTags.length}</div>
          <div className={styles.statLabel}>TOTAL TAGS</div>
        </div>
      </footer>
    </div>
  );
}
