import jsPDF from 'jspdf';
import backgroundImage from '../assets/certificate-template-base64.js'; // Base64 version of uploaded template

export function generateCertificate(username, score, percent) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Set background certificate template image (full A4 landscape size)
  doc.addImage(backgroundImage, 'PNG', 0, 0, pageWidth, pageHeight);

  // Overlay Text Content
  doc.setTextColor(0);

  doc.setFontSize(30);
  doc.setFont('times', 'bold');
  doc.text('CERTIFICATE OF ACHIEVEMENT', pageWidth / 2, 120, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('PRESENTED BY', pageWidth / 2, 170, { align: 'center' });

  doc.setFontSize(22);
  doc.text('PUNJAB POLICE', pageWidth / 2, 200, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(16);
  doc.text(
    `It is officially certified that ${username}, has successfully completed the assessment,`,
    pageWidth / 2,
    260,
    { align: 'center' }
  );
  doc.text(
    `reflecting your hard work, dedication, and commitment to this discipline.`,
    pageWidth / 2,
    280,
    { align: 'center' }
  );
  doc.text(
    `You should take pride in this achievement.`,
    pageWidth / 2,
    300,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('SPMU CELL', pageWidth - 100, pageHeight - 50);

  doc.save('certificate.pdf');
}
