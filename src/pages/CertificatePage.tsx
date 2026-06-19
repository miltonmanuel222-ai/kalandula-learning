import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/mockDb';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritesAndNotifications } from '../contexts/FavoritesAndNotificationsContext';
import type { Course, Certificate } from '../types';
import { Award, Download, Share2, Copy, Check, ExternalLink } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CertificatePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useFavoritesAndNotifications();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    if (courseId && user) {
      const c = db.getCourse(courseId);
      const cert = db.getCertificate(user.id, courseId);
      
      if (c && cert) {
        setCourse(c);
        setCertificate(cert);
        // Fire certificate notification only once per cert issuance
        const notifKey = `cert_notif_${user.id}_${courseId}`;
        if (!localStorage.getItem(notifKey)) {
          localStorage.setItem(notifKey, 'true');
          addNotification({
            userId: user.id,
            type: 'certificate_available',
            title: '📜 Certificado Emitido!',
            message: `O seu certificado de conclusão para "${c.title}" foi emitido com sucesso. Faça o download agora!`,
            courseName: c.title,
            courseId: c.id
          });
        }
      } else {
        navigate('/');
      }
    }
  }, [courseId, user, navigate, addNotification]);

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    setIsDownloading(true);
    
    // Make sure the element is visible for html2canvas
    certRef.current.style.display = 'block';
    
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Certificado_${course?.title.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF', error);
    } finally {
      setIsDownloading(false);
      // Hide again if we choose to keep it off-screen
      certRef.current.style.display = 'none';
    }
  };

  const copyToClipboard = (text: string, type: 'id' | 'url') => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  if (!course || !certificate || !user) return null;

  const dateObj = new Date(certificate.issueDate);
  const issueDate = dateObj.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const credentialUrl = `https://kalandula.edu/cert/${certificate.id}`;
  const linkedInShareUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(course.title)}&organizationName=${encodeURIComponent("Universidade Kalandula")}&issueYear=${dateObj.getFullYear()}&issueMonth=${dateObj.getMonth() + 1}&certId=${certificate.id}&certUrl=${encodeURIComponent(credentialUrl)}`;

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          &larr; Voltar aos Cursos
        </button>

      <div style={{ background: '#fff', borderRadius: '12px', padding: '3rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        <Award size={64} color="var(--primary)" style={{ margin: '0 auto 1.5rem auto' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1c1d1f', marginBottom: '0.5rem' }}>
          Parabéns pela conclusão!
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6a6f73', marginBottom: '2.5rem' }}>
          Concluiu com sucesso o curso <strong>{course.title}</strong>
        </p>

        <div style={{ background: '#f7f9fa', borderRadius: '8px', padding: '1.5rem', textAlign: 'left', marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1c1d1f', marginBottom: '1.5rem' }}>Detalhes da Credencial</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #d1d7dc', paddingBottom: '0.75rem' }}>
              <span style={{ color: '#6a6f73', fontWeight: 600 }}>Data de Emissão</span>
              <span style={{ color: '#1c1d1f', fontWeight: 600 }}>{issueDate}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #d1d7dc', paddingBottom: '0.75rem' }}>
              <span style={{ color: '#6a6f73', fontWeight: 600 }}>Código da Credencial</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#1c1d1f', fontWeight: 600, fontFamily: 'monospace' }}>{certificate.id}</span>
                <button onClick={() => copyToClipboard(certificate.id, 'id')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }} title="Copiar ID">
                  {copiedId ? <Check size={16} color="green" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6a6f73', fontWeight: 600 }}>URL da Credencial</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <a href={credentialUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Verificar <ExternalLink size={14} />
                </a>
                <button onClick={() => copyToClipboard(credentialUrl, 'url')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', marginLeft: '0.5rem' }} title="Copiar URL">
                  {copiedUrl ? <Check size={16} color="green" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            onClick={() => window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`Acabei de concluir o curso ${course.title} na Kalandula Learning! Veja a minha credencial: ${window.location.origin}/certificate/${certificate.id}`)}`, '_blank')}
            className="btn"
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              background: '#0a66c2', color: 'white', padding: '0.8rem 1.5rem', 
              borderRadius: '4px', fontWeight: 700, border: 'none', cursor: 'pointer',
              flex: 1
            }}
          >
            <Share2 size={18} /> Partilhar no LinkedIn
          </button>

          <button 
            onClick={handleDownloadPDF} 
            disabled={isDownloading}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              background: '#1c1d1f', color: '#fff', padding: '0.8rem 1.5rem', 
              borderRadius: '4px', fontWeight: 700, border: 'none', cursor: 'pointer',
              opacity: isDownloading ? 0.7 : 1
            }}
          >
            <Download size={20} /> {isDownloading ? 'A Gerar...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Hidden Certificate for PDF generation */}
      <div style={{ overflow: 'hidden', height: 0 }}>
        <div 
          ref={certRef}
          style={{
            width: '800px',
            height: '565px',
            background: 'white',
            position: 'relative',
            padding: '40px',
            boxSizing: 'border-box',
            boxShadow: 'none',
            color: '#1e293b',
            display: 'none' // will be changed to block right before html2canvas
          }}
        >
          {/* Certificate Border */}
          <div style={{
            position: 'absolute', top: '20px', left: '20px', right: '20px', bottom: '20px',
            border: '2px solid #4F46E5', padding: '2px'
          }}>
            <div style={{
              width: '100%', height: '100%', border: '1px solid #4F46E5',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', padding: '40px', boxSizing: 'border-box'
            }}>
              <Award size={64} color="#4F46E5" style={{ marginBottom: '20px' }} />
              
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: '#0F172A', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Certificado de Conclusão
              </h1>
              
              <p style={{ fontSize: '1.2rem', color: '#64748B', marginBottom: '30px' }}>
                A Universidade Kalandula certifica que
              </p>
              
              <h2 style={{ fontSize: '2.5rem', color: '#0F172A', borderBottom: '2px solid #E2E8F0', paddingBottom: '10px', marginBottom: '30px', width: '80%' }}>
                {user.name}
              </h2>
              
              <p style={{ fontSize: '1.2rem', color: '#64748B', marginBottom: '10px' }}>
                concluiu com sucesso o curso
              </p>
              
              <h3 style={{ fontSize: '1.8rem', color: '#4F46E5', marginBottom: '40px' }}>
                {course.title}
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: 'auto' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid #CBD5E1', paddingBottom: '5px', marginBottom: '5px', width: '150px' }}>
                    {issueDate}
                  </div>
                  <span style={{ fontSize: '0.9rem', color: '#64748B' }}>Data de Emissão</span>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid #CBD5E1', paddingBottom: '5px', marginBottom: '5px', width: '150px', fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 'bold' }}>
                    Universidade Kalandula
                  </div>
                  <span style={{ fontSize: '0.9rem', color: '#64748B' }}>Direção de Ensino</span>
                </div>
              </div>
              
              <div style={{ position: 'absolute', bottom: '30px', fontSize: '0.7rem', color: '#94A3B8' }}>
                ID do Certificado: {certificate.id}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
