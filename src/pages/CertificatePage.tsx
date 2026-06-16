import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/mockDb';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritesAndNotifications } from '../contexts/FavoritesAndNotificationsContext';
import type { Course, Certificate } from '../types';
import { Award, Download } from 'lucide-react';
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
    }
  };

  if (!course || !certificate || !user) return null;

  const issueDate = new Date(certificate.issueDate).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/')} className="btn btn-outline">Voltar aos Cursos</button>
        <button 
          onClick={handleDownloadPDF} 
          className="btn btn-primary"
          disabled={isDownloading}
        >
          <Download size={18} /> {isDownloading ? 'Gerando...' : 'Download PDF'}
        </button>
      </div>

      <div 
        ref={certRef}
        style={{
          width: '800px',
          height: '565px',
          background: 'white',
          position: 'relative',
          padding: '40px',
          boxSizing: 'border-box',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          color: '#1e293b'
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
  );
}
