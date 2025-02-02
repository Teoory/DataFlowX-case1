### Proje Detayları
Bu Proje DataFlowX için hazırlanan bir case çalışmasıdır 

### Linkler
- **Vercel Demo:** [Vercel Demo](https://data-flow-x-case1.vercel.app/)
- **GitHub Repository:** [DataFlowX-case1](https://github.com/Teoory/DataFlowX-case1)
- **Figma Tasarımı:** [Figma Case 1](https://www.figma.com/design/ya3Xlx9UkgYDMlbwRIFo8o/DataFlowX---Case-1?node-id=0-1&m=dev&t=TEpOEij5qMFNKep3-1)
- **LinkedIn Profilim:** [Berkay Köksal](https://www.linkedin.com/in/berkay-koksal/)
- **İletişim:** [berkay.koksall54@gmail.com](mailto:berkay.koksall54@gmail.com)

### Proje Yapısı 
client/<br/>
⊦src/<br/>
⊦─ components/ # Bileşenler<br/>
⊦─ pages/ # Sayfalar<br/>
⊦─ routes/ # Sayfa yönlendirmeleri<br/>
⊦─ hooks/ # Contextlerin bulunduğu klasör<br/>
⨽─ models/ # Schema dosyası<br/>

### Sayfalar
- "Homepage": Anasayfa
- "TeamDetailsPage": Takımın İnceleme Sayfası

### Components
- "Modal": Açılır Kapanır Popup Menüsü
- "Breadcrumbs": Sayfa Takip Menüsü
- "ChartsView": Pie ve Bar Grafiklerinin Ana Bileşeni
- "DiagramView": Diyagram Gösterimi
- "TeamCard": Anasayfadaki grupların kart görünümü
- "TeamForm": Modal içinde Takım Oluşturma Formu
- "UserForm": Modal içinde Yeni Kullanıcı Oluşturma Formu

### Veriler
- Context sayesinde sayfalar arasında gezinirken veri kaybı yaşanmamaktadır

### Teknolojiler
- React
- TypeScript
- BrowserRouter
- ReactFlow
- ReactCharts

### Önemli notlar:
- React Flowu daha önce kullanmadığım için bazı kısımlarını geliştirirken Copilottan destek aldım

### Ekran Görüntüleri
#### Anasayfa
![localhost_5174_](https://github.com/user-attachments/assets/c5318e5b-188f-4b5c-b277-9b527a6331af)
#### Ekip Sayfası
![localhost2_5174_](https://github.com/user-attachments/assets/006d6b6a-6159-4304-94c2-c88f149c8f53)
#### ReactFlow Grup küçültme-büyütme
![Ekran görüntüsü 2025-02-02 163928](https://github.com/user-attachments/assets/fd7c5963-5ce1-477e-95f8-2331142d78c4)
#### ReactFlow Kullanıcı Silme
![Ekran görüntüsü 2025-02-02 163933](https://github.com/user-attachments/assets/d46ec56d-ecc5-4b64-b388-1b780f50a6e1)
