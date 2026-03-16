import React from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  label?: string;
}

export function ImageUpload({ value, onChange, folder, label }: ImageUploadProps) {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona una imagen válida.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('La imagen es demasiado grande (máximo 5MB). Por favor, compriímela antes de subirla.');
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (error) => {
        console.error('Upload error:', error);
        alert('Error al subir la imagen.');
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onChange(downloadURL);
        setUploading(false);
        setProgress(0);
      }
    );
  };

  const handleDelete = async () => {
    if (!value) return;
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta imagen?')) return;

    try {
      // Note: This only works if the URL is a Firebase Storage URL
      // If it's an external URL, we just clear the field
      if (value.includes('firebasestorage.googleapis.com')) {
        const imageRef = ref(storage, value);
        await deleteObject(imageRef);
      }
      onChange('');
    } catch (error) {
      console.error('Delete error:', error);
      // Even if delete fails (e.g. file not found), we clear the field
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</label>}
      
      <div className="relative group">
        {value ? (
          <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-50 group/img">
            <img 
              src={value} 
              alt="Uploaded" 
              className="w-full h-full object-cover transition-transform group-hover/img:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-white text-navy rounded-full shadow-lg hover:bg-primary hover:text-white transition-all"
                title="Cambiar imagen"
              >
                <Upload className="h-4 w-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all"
                title="Eliminar imagen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {uploading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-3 text-slate-400 group"
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
              </div>
            ) : (
              <>
                <div className="p-4 bg-slate-100 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <span className="block font-bold text-slate-600">Subir Imagen</span>
                  <span className="text-xs">JPG, PNG o WEBP</span>
                </div>
              </>
            )}
          </button>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
          accept="image/*"
        />
      </div>
      
      {value && (
        <div className="flex items-center gap-2 text-[10px] text-slate-400 truncate">
          <ImageIcon className="h-3 w-3 shrink-0" />
          <span className="truncate">{value}</span>
        </div>
      )}
    </div>
  );
}
