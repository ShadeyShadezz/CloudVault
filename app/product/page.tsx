"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type StoredFile = { id: string; name: string; size: number; type: string; dataUrl?: string };

function uid() { return Math.random().toString(36).slice(2,9); }

export default function ProductPage() {
  const router = useRouter();
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const user = localStorage.getItem("cv_user");
    if(!user) router.push('/auth');
    const raw = localStorage.getItem('cv_files') || '[]';
    setFiles(JSON.parse(raw));
  },[]);

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if(!f) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = ()=>{
      const dataUrl = String(reader.result);
      const item: StoredFile = { id: uid(), name: f.name, size: f.size, type: f.type, dataUrl };
      const next = [item, ...files];
      setFiles(next);
      localStorage.setItem('cv_files', JSON.stringify(next));
      setLoading(false);
    };
    reader.readAsDataURL(f);
  };

  const remove = (id:string)=>{
    const next = files.filter(f=>f.id!==id);
    setFiles(next); localStorage.setItem('cv_files', JSON.stringify(next));
  };

  return (
    <section className={`space-y-6 ${styles.textMain}`}>
      <h1 className="text-3xl font-bold">Your CloudVault</h1>
      <p className={styles.textMuted}>Upload files (demo). Files are stored client-side for the MVP.</p>

      <div className={styles.panel}>
        <label className="flex cursor-pointer items-center gap-3">
          <span className={styles.cta}>Upload file</span>
          <input onChange={handle} type="file" className="hidden" />
        </label>
        {loading && <div className={`mt-2 ${styles.textMuted}`}>Uploading...</div>}
      </div>

      <div className="space-y-3">
        {files.length===0 && <div className={styles.textMuted}>No files yet.</div>}
        {files.map(f=> (
          <div key={f.id} className={styles.fileRow}>
            <div>
              <div className="font-semibold">{f.name}</div>
              <div className={`text-sm ${styles.textMuted}`}>{f.type || 'unknown'} — {(f.size/1024).toFixed(1)} KB</div>
            </div>
            <div className="flex items-center gap-3">
              <a className={`text-sm ${styles.textMuted}`} href={f.dataUrl} download={f.name}>Download</a>
              <button onClick={()=>remove(f.id)} className="text-sm text-red-400">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
