import jsPDF from 'jspdf';
import backgroundImage from '../assets/certificate-template-base64.js';
export function generateCertificate(username, score, percent) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background certificate template
  doc.addImage(backgroundImage, 'PNG', 0, 0, pageWidth, pageHeight);

  // Text color
  doc.setTextColor(0);

  // === Adjusted positions (moved down by ~60px) ===
  doc.setFontSize(30);
  doc.setFont('times', 'bold');
  doc.text('CERTIFICATE OF ACHIEVEMENT', pageWidth / 2, 180, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('PRESENTED BY', pageWidth / 2, 230, { align: 'center' }); 

  doc.setFontSize(22);
  doc.text('PUNJAB POLICE', pageWidth / 2, 270, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(16);
  doc.text(
    `It is officially certified that ${username},${score},${percent} has successfully completed the assessment,`,
    pageWidth / 2,
    340,
    { align: 'center' }
  );
  doc.text(
    `reflecting your hard work, dedication, and commitment to this discipline.`,
    pageWidth / 2,
    365,
    { align: 'center' }
  );
  doc.text(
    `You should take pride in this achievement.`,
    pageWidth / 2,
    390,
    { align: 'center' }
  );

  // === SPMU CELL moved up above bottom margin ===
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(18);
  doc.text('SPMU CELL', pageWidth - 120, pageHeight - 100); // moved up

  doc.save('certificate.pdf');
}
