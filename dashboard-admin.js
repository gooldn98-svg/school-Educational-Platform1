// بيانات توضيحية
const studentsData = [
  { id: 1, name: 'أحمد محمد علي', class: '9/أ', gender: 'ذكر', average: '92%', status: 'نشط', parent: 'علي محمد' },
  { id: 2, name: 'سارة عبد الله', class: '7/ب', gender: 'أنثى', average: '88%', status: 'نشط', parent: 'عبد الله علي' },
  { id: 3, name: 'خالد حسن صالح', class: '10/أ', gender: 'ذكر', average: '76%', status: 'نشط', parent: 'حسن صالح' },
  { id: 4, name: 'ريم محمد قاسم', class: '5/أ', gender: 'أنثى', average: '95%', status: 'نشط', parent: 'محمد قاسم' },
  { id: 5, name: 'عبد الرحمن علي', class: '12/ب', gender: 'ذكر', average: '84%', status: 'نشط', parent: 'علي محمد' }
];

const teachersData = [
  { id: 1, name: 'أ. فاطمة الزهراء', subject: 'اللغة العربية', classes: '5', qualification: 'بكالوريوس', startDate: '2020' },
  { id: 2, name: 'أ. محمد الحكيمي', subject: 'الرياضيات', classes: '4', qualification: 'بكالوريوس', startDate: '2019' },
  { id: 3, name: 'أ. ليلى أحمد', subject: 'العلوم', classes: '6', qualification: 'ماجستير', startDate: '2018' },
  { id: 4, name: 'أ. سمير علي', subject: 'اللغة الإنجليزية', classes: '3', qualification: 'بكالوريوس', startDate: '2021' }
];

const classesData = Array.from({length:12}, (_,i) => ({
  id: i+1,
  name: ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر', 'الحادي عشر', 'الثاني عشر'][i],
  stage: i < 6 ? 'أساسي' : i < 9 ? 'إعدادي' : 'ثانوي',
  sections: i % 3 + 1,
  students: 30 + i * 2,
  attendance: 55 + i * 3
}));

const subjectsData = [
  { id: 1, name: 'اللغة العربية', units: 12, grades: '1-12', color: 'rgb(23,107,98)' },
  { id: 2, name: 'الرياضيات', units: 10, grades: '1-12', color: 'rgb(77,117,185)' },
  { id: 3, name: 'العلوم', units: 8, grades: '1-12', color: 'rgb(38,184,122)' },
  { id: 4, name: 'اللغة الإنجليزية', units: 14, grades: '1-12', color: 'rgb(196,106,167)' },
  { id: 5, name: 'الدراسات الاجتماعية', units: 7, grades: '1-12', color: 'rgb(233,185,73)' },
  { id: 6, name: 'التربية الإسلامية', units: 9, grades: '1-12', color: 'rgb(38,144,122)' },
  { id: 7, name: 'الحاسوب', units: 6, grades: '1-12', color: 'rgb(100,150,180)' },
  { id: 8, name: 'التربية الوطنية', units: 5, grades: '1-12', color: 'rgb(200,107,107)' }
];

const app = document.getElementById('app');
const title = document.getElementById('pageTitle');
const userNameDisplay = document.getElementById('userNameDisplay');
const dropdownName = document.getElementById('dropdownName');

// تحميل بيانات المستخدم
window.addEventListener('load', () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (!userData || userData.role !== 'admin') {
    window.location.href = 'login.html';
  } else {
    const firstName = userData.name.split(' ')[0];
    userNameDisplay.textContent = firstName;
    dropdownName.textContent = userData.name;
  }
});

function dashboard() {
  return `
    <div class="welcome">
      <div>
        <p class="eyebrow">الأحد، 27 سبتمبر 2026</p>
        <h1>مرحباً بك في لوحة التحكم 👋</h1>
        <p>إليك ملخص أداء المدرسة لهذا اليوم.</p>
      </div>
      <div class="date-chip">🗓 الفصل الدراسي الأول 2026/2027</div>
    </div>

    <div class="stats">
      <div class="card stat-card">
        <div class="stat-head">
          <div class="stat-icon">♙</div>
          <span class="trend">↑ 8.2%</span>
        </div>
        <h2>1,248</h2>
        <p>إجمالي الطلاب</p>
      </div>
      <div class="card stat-card">
        <div class="stat-head">
          <div class="stat-icon">♗</div>
          <span class="trend">↑ 4.5%</span>
        </div>
        <h2>86</h2>
        <p>عدد المعلمين</p>
      </div>
      <div class="card stat-card">
        <div class="stat-head">
          <div class="stat-icon">▦</div>
          <span class="trend">↑ 2.1%</span>
        </div>
        <h2>42</h2>
        <p>الفصول الدراسية</p>
      </div>
      <div class="card stat-card">
        <div class="stat-head">
          <div class="stat-icon">◎</div>
          <span class="trend">↑ 6.8%</span>
        </div>
        <h2>94.6%</h2>
        <p>نسبة الحضور اليوم</p>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">
          <h3>متوسط التحصيل الدراسي</h3>
          <button class="link" onclick="notify('تم فتح التقرير الكامل')">عرض التقرير ←</button>
        </div>
        <div class="chart">
          ${[65,78,58,88,72,94,80].map((h,i) => `
            <div class="bar-col">
              <div class="bar ${i===5?'highlight':''}" style="height:${h}%"></div>
              <span>${['أول','ثان','ثال','راب','خام','ساد','ساب'][i]}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <h3>آخر النشاطات</h3>
          <button class="link" onclick="notify('تم فتح سجل النشاطات')">عرض الكل</button>
        </div>
        <div class="activity">
          <div class="activity-icon">✓</div>
          <div><strong>تم تسجيل حضور الصف التاسع</strong><small>منذ 15 دقيقة · أ. فاطمة الزهراء</small></div>
        </div>
        <div class="activity">
          <div class="activity-icon">▤</div>
          <div><strong>تم رفع اختبار الرياضيات</strong><small>منذ ساعة · أ. محمد الحكيمي</small></div>
        </div>
        <div class="activity">
          <div class="activity-icon">♙</div>
          <div><strong>انضم 12 طالباً جديداً</strong><small>أمس · شؤون الطلاب</small></div>
        </div>
      </div>
    </div>
  `;
}

function studentsView() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">إدارة المجتمع المدرسي</p>
        <h1>الطلاب</h1>
      </div>
      <button class="primary-btn" onclick="notify('تم فتح نموذج إضافة طالب')">+ إضافة طالب</button>
    </div>
    <div class="card table-card">
      <div class="toolbar">
        <input class="search" placeholder="ابحث باسم الطالب..." oninput="filterTable(this.value, 'studentTable')">
        <select class="filter" onchange="filterByClass(this.value)">
          <option value="">كل الصفوف</option>
          <option value="5">الصف الخامس</option>
          <option value="7">الصف السابع</option>
          <option value="9">الصف التاسع</option>
          <option value="10">الصف العاشر</option>
          <option value="12">الصف الثاني عشر</option>
        </select>
      </div>
      <table id="studentTable">
        <thead><tr><th>الطالب</th><th>الصف</th><th>الجنس</th><th>المتوسط</th><th>الحالة</th><th>ولي الأمر</th><th></th></tr></thead>
        <tbody>
          ${studentsData.map(s => `
            <tr>
              <td><div class="person"><div class="avatar">${s.name[0]}</div><strong>${s.name}</strong></div></td>
              <td>${s.class}</td>
              <td>${s.gender}</td>
              <td>${s.average}</td>
              <td><span class="badge">${s.status}</span></td>
              <td>${s.parent}</td>
              <td><button class="link" onclick="notify('تم فتح ملف ${s.name}')">عرض</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function teachersView() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">إدارة الكادر التعليمي</p>
        <h1>المعلمون</h1>
      </div>
      <button class="primary-btn" onclick="notify('تم فتح نموذج إضافة معلم')">+ إضافة معلم</button>
    </div>
    <div class="card table-card">
      <div class="toolbar">
        <input class="search" placeholder="ابحث باسم المعلم..." oninput="filterTable(this.value, 'teacherTable')">
        <select class="filter">
          <option>كل التخصصات</option>
          <option>اللغة العربية</option>
          <option>الرياضيات</option>
          <option>العلوم</option>
          <option>اللغة الإنجليزية</option>
        </select>
      </div>
      <table id="teacherTable">
        <thead><tr><th>المعلم</th><th>التخصص</th><th>عدد الفصول</th><th>المؤهل</th><th>تاريخ التعيين</th><th></th></tr></thead>
        <tbody>
          ${teachersData.map(t => `
            <tr>
              <td><div class="person"><div class="avatar">${t.name[0]}</div><strong>${t.name}</strong></div></td>
              <td>${t.subject}</td>
              <td>${t.classes}</td>
              <td>${t.qualification}</td>
              <td>${t.startDate}</td>
              <td><button class="link" onclick="notify('تم فتح ملف ${t.name}')">عرض</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function classesView() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">العام الدراسي 2026/2027</p>
        <h1>الصفوف والفصول</h1>
      </div>
      <button class="primary-btn" onclick="notify('تم فتح نموذج إضافة فصل')">+ إضافة فصل</button>
    </div>
    <div class="class-grid">
      ${classesData.map(c => `
        <div class="card class-card">
          <h3>الصف ${c.name}</h3>
          <p>${c.stage} · ${c.sections} فصول</p>
          <div style="margin:12px 0;font-size:12px;color:#71808a">👥 ${c.students} طالب</div>
          <div class="progress"><i style="width:${c.attendance}%"></i></div>
          <p style="margin-top:8px;font-size:12px;color:#71808a">${c.attendance}% حضور</p>
        </div>
      `).join('')}
    </div>
  `;
}

function curriculumView() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">المنهج اليمني</p>
        <h1>المناهج والمواد الدراسية</h1>
      </div>
      <button class="primary-btn" onclick="notify('تم فتح نموذج إضافة مادة')">+ إضافة مادة</button>
    </div>
    <p style="color:var(--muted);margin-top:-10px;margin-bottom:22px">المواد المعتمدة لجميع الصفوف من الأول إلى الثاني عشر.</p>
    <div class="subject-grid">
      ${subjectsData.map(s => `
        <div class="subject" style="border-top:4px solid ${s.color}">
          <h3>${s.name}</h3>
          <p>${s.units} وحدات دراسية</p>
          <p style="color:${s.color};font-weight:600;margin-top:8px">الصفوف: ${s.grades}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function parentsView() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">التواصل مع أولياء الأمور</p>
        <h1>أولياء الأمور</h1>
      </div>
      <button class="primary-btn" onclick="notify('تم فتح نموذج إضافة ولي أمر')">+ إضافة ولي أمر</button>
    </div>
    <div class="card" style="padding:40px;text-align:center">
      <div class="subject-icon" style="margin:0 auto 15px;width:50px;height:50px;font-size:24px">👥</div>
      <h3>إدارة أولياء الأمور</h3>
      <p style="color:var(--muted);margin-bottom:20px">يمكنك إضافة وإدارة حسابات أولياء الأمور والتواصل معهم بشأن تقدم أبنائهم.</p>
      <button class="primary-btn" onclick="notify('سيتم تفعيل هذه الميزة قريباً')">ابدأ الآن</button>
    </div>
  `;
}

function scheduleView() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">تنظيم الدراسة</p>
        <h1>الجدول الدراسي</h1>
      </div>
      <button class="primary-btn" onclick="notify('تم فتح نموذج إنشاء جدول')">+ إنشاء جدول</button>
    </div>
    <div class="card" style="padding:40px;text-align:center">
      <div class="subject-icon" style="margin:0 auto 15px;width:50px;height:50px;font-size:24px">🗓</div>
      <h3>الجداول الدراسية</h3>
      <p style="color:var(--muted);margin-bottom:20px">قم بإنشاء وإدارة الجداول الدراسية لكل صف دراسي.</p>
      <button class="primary-btn" onclick="notify('سيتم تفعيل هذه الميزة قريباً')">ابدأ الآن</button>
    </div>
  `;
}

function reportsView() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">تحليل الأداء</p>
        <h1>التقارير والإحصائيات</h1>
      </div>
      <button class="primary-btn" onclick="notify('تم تصدير التقرير')">📥 تصدير التقرير</button>
    </div>
    <div class="card" style="padding:40px;text-align:center">
      <div class="subject-icon" style="margin:0 auto 15px;width:50px;height:50px;font-size:24px">📊</div>
      <h3>التقارير الشاملة</h3>
      <p style="color:var(--muted);margin-bottom:20px">عرض التقارير المفصلة عن أداء الطلاب والمعلمين والمدرسة.</p>
      <button class="primary-btn" onclick="notify('سيتم تفعيل هذه الميزة قريباً')">ابدأ الآن</button>
    </div>
  `;
}

function analyticsView() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">تحليل البيانات</p>
        <h1>التحليلات المتقدمة</h1>
      </div>
      <button class="primary-btn" onclick="notify('تم فتح لوحة التحليلات')">🔍 التحليل</button>
    </div>
    <div class="card" style="padding:40px;text-align:center">
      <div class="subject-icon" style="margin:0 auto 15px;width:50px;height:50px;font-size:24px">📈</div>
      <h3>التحليلات</h3>
      <p style="color:var(--muted);margin-bottom:20px">احصل على رؤى عميقة حول أداء المدرسة والطلاب والمعلمين.</p>
      <button class="primary-btn" onclick="notify('سيتم تفعيل هذه الميزة قريباً')">ابدأ الآن</button>
    </div>
  `;
}

function attendanceView() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">تتبع الحضور</p>
        <h1>الحضور والغياب</h1>
      </div>
      <button class="primary-btn" onclick="notify('تم فتح نموذج تسجيل الحضور')">+ تسجيل حضور</button>
    </div>
    <div class="card" style="padding:40px;text-align:center">
      <div class="subject-icon" style="margin:0 auto 15px;width:50px;height:50px;font-size:24px">✓</div>
      <h3>سجل الحضور والغياب</h3>
      <p style="color:var(--muted);margin-bottom:20px">تتبع حضور وغياب الطلاب والمعلمين بسهولة.</p>
      <button class="primary-btn" onclick="notify('سيتم تفعيل هذه الميزة قريباً')">ابدأ الآن</button>
    </div>
  `;
}

const views = {
  dashboard: ['لوحة التحكم', dashboard],
  students: ['الطلاب', studentsView],
  teachers: ['المعلمون', teachersView],
  parents: ['أولياء الأمور', parentsView],
  classes: ['الصفوف والفصول', classesView],
  curriculum: ['المناهج والمواد', curriculumView],
  schedule: ['الجدول الدراسي', scheduleView],
  reports: ['التقارير', reportsView],
  analytics: ['التحليلات', analyticsView],
  attendance: ['الحضور والغياب', attendanceView]
};

function render(view = 'dashboard') {
  const v = views[view] || views.dashboard;
  title.textContent = v[0];
  app.innerHTML = v[1]();
  document.querySelectorAll('.nav-item[data-view]').forEach(x => 
    x.classList.toggle('active', x.dataset.view === view)
  );
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('profileDropdown').style.display = 'none';
}

document.querySelectorAll('.nav-item[data-view]').forEach(x => 
  x.addEventListener('click', () => render(x.dataset.view))
);

document.getElementById('menuToggle').onclick = () => 
  document.getElementById('sidebar').classList.toggle('open');

function toggleProfileMenu() {
  const dropdown = document.getElementById('profileDropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function notify(message) {
  const t = document.getElementById('toast');
  t.textContent = message;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2300);
}

function filterTable(value, tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  table.querySelectorAll('tbody tr').forEach(row => {
    row.style.display = row.textContent.includes(value) ? '' : 'none';
  });
}

function filterByClass(value) {
  const table = document.getElementById('studentTable');
  if (!table) return;
  table.querySelectorAll('tbody tr').forEach(row => {
    if (!value) {
      row.style.display = '';
    } else {
      const classCell = row.cells[1]?.textContent || '';
      row.style.display = classCell.includes(value) ? '' : 'none';
    }
  });
}

function logout() {
  if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
    localStorage.removeItem('user');
    localStorage.removeItem('remember');
    window.location.href = 'login.html';
  }
}

render();

// إضافة نمط البطاقات الإضافية
const style = document.createElement('style');
style.textContent = `
  .show { animation: slideIn 0.3s; }
  @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; } }
  #toast { position: fixed; bottom: 20px; right: 20px; background: #38b77a; color: white; padding: 12px 20px; border-radius: 8px; display: none; }
  #toast.show { display: block; }
  .profile-dropdown { display: none; }
`;
document.head.appendChild(style);
