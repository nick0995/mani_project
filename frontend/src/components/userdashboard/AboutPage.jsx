import React from "react";
import EmergencySidebar from "./EmergencySidebar"; // ✅ import sidebar

const AboutPage = () => {




  return (
    <>
      {/* Hero Section */}
      <section className="hero bg-gradient-to-br from-[#2c3e50] to-[#3498db] text-black py-12 text-center">
        <h1 className="text-3xl font-bold">PUNJAB POLICE TRAINING PROGRAM</h1>
        <p className="mt-4 max-w-4xl mx-auto">
          Comprehensive online training for Crime and Criminal Tracking Network
          &amp; Systems, Interoperable Criminal Justice System and Khoj
        </p>
      </section>

      {/* About + Sidebar Layout */}
      <div className="container-fluid py-4">
        <div className="row">
          {/* Main About Content */}
          <div className="col-md-9">
            <div className="About-section">
              <h3 className="text-center text-white">About Us</h3>
            </div>
          <div className="col-md-10 mx-auto py-4 About-section-details text-justify">
            <h5>Crime and Criminal Tracking Network &amp; Systems (CCTNS)</h5>
            <p>
              The Crime and Criminal Tracking Network &amp; Systems (CCTNS) project was launched in 2009 as a plan scheme. It is an ambitious project, which aims at putting in place a comprehensive and integrated system for enhancing efficiency and effectiveness of policing at the police station level throughout the country. As on 1st July, 2021, CCTNS application was deployed in 16,276 (100%) and connectivity has been provided in 15735 (97%) out of 16,276 Police Stations (PSs) across the country. During the period from 30.06.2019 to 31.06.2021, CCTNS generated FIR forms (IIF-1) submitted in courts has shown an increase by 15% i.e. from 70 % to 85%. The number of Police stations with the ability to search on National Database has increased by 762 i.e. from 14,112 to 14,874 PSs. CCTNS National Database has grown to about 28 Crores records. Digital Police Portal has been converted into master police portal to provide linkages with all citizen portals of States/UTs for ease of accessibility. BhartNet connectivity has started rolling out in 127 locations which are difficult and technically non-feasible sites in remote areas of the country after lot of efforts done by NCRB with DOT and USOF. Due to continuous follow-up, implementation of CCTNS also progressed well in Bihar State covering 894 PSs. An Agreement between NCRB and C-DAC was signed for Enhancement and Maintenance of CAS (State) 5.0 Application under CCTNS. CAS (Centre) Application went Go-Live on 25.02.2021.</p>

              <h5>About NCRB</h5>
               <p>NCRB was set-up in 1986 to function as a repository of information on crime and criminals so as to assist the investigators in linking crime to the perpetrators based on the recommendations of the Tandon Committee, National Police Commission (1977-1981) and the MHA’s Task force (1985).
               Subsequently, NCRB was entrusted with the responsibility for monitoring, coordinating and implementing the Crime and Criminal Tracking Network &amp; Systems (CCTNS) project in the year 2009. The project has connected 15000+ police stations and 6000 higher offices of police in the country.
              On 21st August 2017, NCRB launched National Digital Police Portal (https://digitalpolice.gov.in). It is a master police portal which caters both to the citizens as well as to the police personnel. It allows police personnel to search for a criminal / suspect on the CCTNS database, besides access to many other police utilities like Cri-MAC, NDSO, CyTrain etc. To citizens, it provides various services like filing of complaints online and seeking antecedent verification of tenants, domestic helps, drivers etc., and newly launched citizen services like, search for missing persons, NOC for purchase of second hand vehicle and information on Proclaimed Offenders.
              The Bureau has also been entrusted to maintain National Database of Sexual Offenders (NDSO) and share it with the States/UTs on regular basis. NCRB has also been designated as the Central Nodal Agency to manage technical and operational functions of the ‘Online Cyber-Crime Reporting Portal’ through which any citizen can lodge a complaint or upload a video clip as an evidence of crime related to child pornography, rape/gang rape. NCRB has also launched CyTrain, a portal for online training of different stakeholders in cybercrime investigations and prosecution. NCRB also maintains Counterfeit Currency Information and Management System (FICN) and Integrated Monitoring on Terrorism (iMoT) applications.
             Cri-MAC (Crime – Multi Agency Centre) is yet another IT tool launched by NCRB this year as per the recommendation of DGPs/IGPs Conference 2018, for sharing of information on Crime / Criminals – sending alerts on Inter-State Criminals / Gangs to States/UTs, etc. and providing email/sms based communication module for inter agency / unit co-ordination.
             NCRB also compiles and publishes National Crime Statistics i.e. Crime in India, Accidental Deaths &amp; Suicides and also Prison Statistics. These publications serve as principal reference point by policy makers, police, criminologists, researchers and media, both in India and abroad. NCRB has been conferred with Silver award during Digital India Awards 2016 under Open Data Championship category from the Government of India for uploading Crime Statistics since 1953 on Govt. Portal.
             The Central Finger Print Bureau under NCRB is a national repository of all fingerprints in the country and has more than one million ten-digit finger prints database of criminals both convicted and arrested and provides for search facility on Fingerprint Analysis and Criminal Tracing System (FACTS). Through the proposed NAFIS System to be commissioned by the year end, all States will be able to upload and search finger prints directly to/from NCRB national database. This will improve efficiency of fingerprint storage and search drastically and prove to be a game changer in police investigations. Further, NCRB publishes ‘Finger Prints in India’ annually and organizes the annual conference of Directors of Finger Print Bureaux of all the states to deliberate on topical issues related to the use of fingerprint science in police investigations.
             NCRB also assists various States in capacity building in the area of Information Technology, CCTNS, Finger Prints, Network security and Digital Forensics through its training centers in Delhi, Kolkata. It also assists four Regional Police Computer Training Centres (RPCTC) at Hyderabad, Gandhi Nagar, Lucknow and Kolkata.
             The Bureau has moved into its new office complex at Mahipalpur, which was inaugurated by the Hon’ble Union Home Minister Shri Rajnath Singh on 8th September 2017.
            </p>


            <p><strong>1. CCTNS Phase II:</strong></p>
            <ul>
              <li>Linkages of Specialized Solutions like National Automated Fingerprint Identification System (NAFIS) and Advanced Facial Recognition System (AFRS) in CCTNS. Integration of CCTNS with other central databases, viz Vaahan &amp; Saarthi of MoRTH, Arms Licenses of MHA, Passport of MEA, IVFRT of GoI, MHA and TrackChild of MWCD.</li>
              <li>Connecting all FIR Registering Units presently not covered under CCTNS project like Excise, Forest, Transport, CBI, NCB, ED, NIA, RPF etc.</li>
              <li>Hardware Infrastructure upgrade for all PSs, HOs, NDC, SDCs, and DRCs.</li>
            </ul>

            <p><strong>2. ICJS:</strong> To assist as a nodal agency in the operationalization...</p>
            <p><strong>3. Crime Data Analytics:</strong> For strategic planning &amp; predictive policing</p>

            <h5>Central Citizen Services - National Crime Records Bureau</h5>
            <ul>
              <li><strong>Missing Person Search:</strong> search against national database of recovered persons...</li>
              <li><strong>Generate Vehicle NOC:</strong> verify vehicle status before purchase...</li>
              <li><strong>Proclaimed Offenders:</strong> citizen-cooperation system to track offenders...</li>
              <li><strong>Locate Nearest Police Station:</strong> GPS-based mobile app for emergency response...</li>
            </ul>

            <p>These services promote the <strong>‘Ease of Living’</strong>.</p>
          </div>
          
        </div>
          {/* Emergency Sidebar */}
          <div className="col-md-3">
            <EmergencySidebar />
          </div>
        
      </div>
      </div>
  </>
  );
};

export default AboutPage;
