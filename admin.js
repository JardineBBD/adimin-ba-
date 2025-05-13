// ข้อมูลการจองตัวอย่าง
const bookings = [
    {
        id: 1,
        department: 'วิศวกรรมอุตสาหการ',
        lab: 'IE101',
        date: '2023-05-15',
        time: '10:00-11:00',
        studentId: '6313078',
        purpose: 'ทำการทดลองการดึงพลาสติก',
        status: 'pending' // pending, approved, rejected
    },
    {
        id: 2,
        department: 'วิศวกรรมไฟฟ้า',
        lab: 'EE103',
        date: '2023-05-16',
        time: '13:00-14:00',
        studentId: '6312345',
        purpose: 'ทดสอบวงจรไฟฟ้ากระแสสลับ',
        status: 'pending'
    },
    {
        id: 3,
        department: 'วิศวกรรมเคมี',
        lab: 'CHE102',
        date: '2023-05-16',
        time: '09:00-10:00',
        studentId: '6311234',
        purpose: 'ทำการทดลองการกลั่นน้ำมัน',
        status: 'pending'
    },
    {
        id: 4,
        department: 'วิศวกรรมคอมพิวเตอร์',
        lab: 'CO105',
        date: '2023-05-17',
        time: '14:00-15:00',
        studentId: '6310987',
        purpose: 'ทดสอบระบบความปลอดภัยเครือข่าย',
        status: 'pending'
    },
    {
        id: 5,
        department: 'วิศวกรรมโยธา',
        lab: 'CE104',
        date: '2023-05-18',
        time: '11:00-12:00',
        studentId: '6309876',
        purpose: 'ทดสอบความแข็งแรงของคอนกรีต',
        status: 'pending'
    }
];

// ข้อมูลตัวอย่างสำหรับสถิติการใช้ห้องในรอบ 7 วัน
const usageStats = [
    { lab: 'CE101', count: 12, department: 'วิศวกรรมโยธา' },
    { lab: 'CE102', count: 8, department: 'วิศวกรรมโยธา' },
    { lab: 'CE103', count: 15, department: 'วิศวกรรมโยธา' },
    { lab: 'CE104', count: 10, department: 'วิศวกรรมโยธา' },
    { lab: 'CE105', count: 7, department: 'วิศวกรรมโยธา' },
    { lab: 'IE101', count: 18, department: 'วิศวกรรมอุตสาหการ' },
    { lab: 'IE102', count: 14, department: 'วิศวกรรมอุตสาหการ' },
    { lab: 'IE103', count: 9, department: 'วิศวกรรมอุตสาหการ' },
    { lab: 'IE104', count: 11, department: 'วิศวกรรมอุตสาหการ' },
    { lab: 'IE105', count: 16, department: 'วิศวกรรมอุตสาหการ' },
    { lab: 'CHE101', count: 6, department: 'วิศวกรรมเคมี' },
    { lab: 'CHE102', count: 13, department: 'วิศวกรรมเคมี' },
    { lab: 'CHE103', count: 9, department: 'วิศวกรรมเคมี' },
    { lab: 'CHE104', count: 7, department: 'วิศวกรรมเคมี' },
    { lab: 'CHE105', count: 5, department: 'วิศวกรรมเคมี' },
    { lab: 'BME101', count: 8, department: 'วิศวกรรมชีวการแพทย์' },
    { lab: 'BME102', count: 11, department: 'วิศวกรรมชีวการแพทย์' },
    { lab: 'BME103', count: 6, department: 'วิศวกรรมชีวการแพทย์' },
    { lab: 'BME104', count: 9, department: 'วิศวกรรมชีวการแพทย์' },
    { lab: 'BME105', count: 4, department: 'วิศวกรรมชีวการแพทย์' },
    { lab: 'ME101', count: 15, department: 'วิศวกรรมเครื่องกล' },
    { lab: 'ME102', count: 12, department: 'วิศวกรรมเครื่องกล' },
    { lab: 'ME103', count: 17, department: 'วิศวกรรมเครื่องกล' },
    { lab: 'ME104', count: 10, department: 'วิศวกรรมเครื่องกล' },
    { lab: 'ME105', count: 8, department: 'วิศวกรรมเครื่องกล' },
    { lab: 'CO101', count: 20, department: 'วิศวกรรมคอมพิวเตอร์' },
    { lab: 'CO102', count: 16, department: 'วิศวกรรมคอมพิวเตอร์' },
    { lab: 'CO103', count: 18, department: 'วิศวกรรมคอมพิวเตอร์' },
    { lab: 'CO104', count: 12, department: 'วิศวกรรมคอมพิวเตอร์' },
    { lab: 'CO105', count: 14, department: 'วิศวกรรมคอมพิวเตอร์' },
    { lab: 'EE101', count: 13, department: 'วิศวกรรมไฟฟ้า' },
    { lab: 'EE102', count: 11, department: 'วิศวกรรมไฟฟ้า' },
    { lab: 'EE103', count: 15, department: 'วิศวกรรมไฟฟ้า' },
    { lab: 'EE104', count: 9, department: 'วิศวกรรมไฟฟ้า' },
    { lab: 'EE105', count: 7, department: 'วิศวกรรมไฟฟ้า' }
];

let selectedBookingId = null;
let roomUsageChart = null;

// แสดงกราฟสถิติการใช้ห้อง
function renderRoomUsageChart(department = 'all') {
    const canvas = document.getElementById('roomUsageChart');
    const ctx = canvas.getContext('2d');
    
    // ถ้ามีกราฟอยู่แล้ว ให้ทำลายก่อนสร้างใหม่
    if (roomUsageChart) {
        roomUsageChart.destroy();
    }
    
    // กรองข้อมูลตามสาขาวิชาที่เลือก
    const filteredData = department === 'all' 
        ? usageStats 
        : usageStats.filter(item => item.department === department);
    
    // เรียงลำดับตามจำนวนการใช้งานจากมากไปน้อย
    filteredData.sort((a, b) => b.count - a.count);
    
    // ถ้ามีมากกว่า 15 รายการ ให้แสดงเฉพาะ 15 รายการแรก
    const topData = filteredData.slice(0, 15);
    
    // เตรียมข้อมูลสำหรับกราฟ
    const labels = topData.map(item => item.lab);
    const data = topData.map(item => item.count);
    
    // สีสำหรับแท่งกราฟ แยกตามสาขาวิชา
    const backgroundColors = topData.map(item => {
        switch(item.department) {
            case 'วิศวกรรมโยธา': return 'rgba(54, 162, 235, 0.7)';
            case 'วิศวกรรมอุตสาหการ': return 'rgba(255, 99, 132, 0.7)';
            case 'วิศวกรรมเคมี': return 'rgba(75, 192, 192, 0.7)';
            case 'วิศวกรรมชีวการแพทย์': return 'rgba(153, 102, 255, 0.7)';
            case 'วิศวกรรมเครื่องกล': return 'rgba(255, 159, 64, 0.7)';
            case 'วิศวกรรมคอมพิวเตอร์': return 'rgba(255, 205, 86, 0.7)';
            case 'วิศวกรรมไฟฟ้า': return 'rgba(201, 203, 207, 0.7)';
            default: return 'rgba(54, 162, 235, 0.7)';
        }
    });
    
    // สร้างกราฟ
    roomUsageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'จำนวนครั้งที่ใช้งาน (7 วันล่าสุด)',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'จำนวนครั้ง'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'ห้องแลป'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: department === 'all' ? 'สถิติการใช้ห้องแลปทั้งหมด 7 วันล่าสุด' : `สถิติการใช้ห้องแลป${department} 7 วันล่าสุด`,
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            return `สาขา: ${topData[index].department}`;
                        }
                    }
                }
            }
        }
    });
}

// แสดงรายการจอง
function renderBookings() {
    const tableBody = document.getElementById('bookingTable');
    tableBody.innerHTML = '';
    
    bookings.forEach(booking => {
        const row = document.createElement('tr');
        
        // เพิ่มสีพื้นหลังตามสถานะ
        if (booking.status === 'approved') {
            row.classList.add('bg-green-100');
        } else if (booking.status === 'rejected') {
            row.classList.add('bg-red-100');
        } else {
            row.classList.add('bg-yellow-50');
        }
        
        row.innerHTML = `
            <td class="py-3 px-4 border-b">${booking.department}</td>
            <td class="py-3 px-4 border-b">${booking.lab}</td>
            <td class="py-3 px-4 border-b">${formatDate(booking.date)}</td>
            <td class="py-3 px-4 border-b">${booking.time}</td>
            <td class="py-3 px-4 border-b">${booking.studentId}</td>
            <td class="py-3 px-4 border-b">${booking.purpose}</td>
            <td class="py-3 px-4 border-b">
                <div class="flex justify-center space-x-2">
                    ${booking.status === 'pending' ? `
                        <button 
                            class="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded approve-btn"
                            data-id="${booking.id}"
                        >
                            อนุมัติ
                        </button>
                        <button 
                            class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded reject-btn"
                            data-id="${booking.id}"
                        >
                            ปฏิเสธ
                        </button>
                    ` : booking.status === 'approved' ? `
                        <span class="text-green-700 font-medium">อนุมัติแล้ว</span>
                    ` : `
                        <span class="text-red-700 font-medium">ปฏิเสธแล้ว</span>
                    `}
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // เพิ่ม event listeners ให้กับปุ่มอนุมัติและปฏิเสธ
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = parseInt(this.getAttribute('data-id'));
            approveBooking(bookingId);
        });
    });
    
    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = parseInt(this.getAttribute('data-id'));
            openRejectModal(bookingId);
        });
    });
}

// อนุมัติการจอง
function approveBooking(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
        booking.status = 'approved';
        renderBookings();
        alert(`อนุมัติการจองห้อง ${booking.lab} สำเร็จ!`);
    }
}

// เปิด modal ปฏิเสธการจอง
function openRejectModal(bookingId) {
    selectedBookingId = bookingId;
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
        document.getElementById('rejectBookingInfo').textContent = 
            `กรุณาระบุเหตุผลในการปฏิเสธการจองห้อง ${booking.lab} สาขา${booking.department}`;
        document.getElementById('rejectModal').classList.remove('hidden');
        document.getElementById('rejectModal').classList.add('flex');
        document.getElementById('rejectReason').value = '';
    }
}

// ปิด modal ปฏิเสธการจอง
function closeRejectModal() {
    document.getElementById('rejectModal').classList.add('hidden');
    document.getElementById('rejectModal').classList.remove('flex');
    selectedBookingId = null;
}

// ยืนยันการปฏิเสธการจอง
function confirmReject() {
    const reason = document.getElementById('rejectReason').value;
    
    if (!reason) {
        alert('กรุณาระบุเหตุผลในการปฏิเสธการจอง');
        return;
    }
    
    const booking = bookings.find(b => b.id === selectedBookingId);
    if (booking) {
        booking.status = 'rejected';
        booking.rejectReason = reason;
        renderBookings();
        closeRejectModal();
        alert(`ปฏิเสธการจองห้อง ${booking.lab} สำเร็จ!`);
    }
}

// แปลงรูปแบบวันที่
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// จำลองการดาวน์โหลด PDF
function downloadStatsPDF() {
    alert('กำลังดาวน์โหลดรายงานสถิติการใช้ห้องแลปในรูปแบบ PDF');
    // ในระบบจริงควรใช้ไลบรารีเช่น jsPDF เพื่อสร้างไฟล์ PDF จริงๆ
}

// เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    // แสดงกราฟสถิติการใช้ห้อง
    renderRoomUsageChart();
    
    // แสดงรายการจอง
    renderBookings();
    
    // ปุ่มยกเลิกการปฏิเสธ
    document.getElementById('cancelRejectBtn').addEventListener('click', closeRejectModal);
    
    // ปุ่มยืนยันการปฏิเสธ
    document.getElementById('confirmRejectBtn').addEventListener('click', confirmReject);
    
    // กรองกราฟตามสาขาวิชา
    document.getElementById('departmentFilter').addEventListener('change', function() {
        renderRoomUsageChart(this.value);
    });
    
    // ปุ่มดาวน์โหลด PDF
    document.getElementById('downloadStatsBtn').addEventListener('click', downloadStatsPDF);
    
    // ปุ่มออกจากระบบ
    document.getElementById('logoutBtn').addEventListener('click', function() {
        alert('กำลังออกจากระบบ');
        // ในระบบจริงควรเปลี่ยนไปที่หน้า login
        // window.location.href = 'index.html';
    });
});

