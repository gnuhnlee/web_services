/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
function capNhatBoDem() {
	const tatCaTin = document.querySelectorAll("#list li");
	const tinHienThi = document.querySelectorAll("#list li:not(.an)");
	document.querySelector("#bo-dem").textContent = `Đang hiển thị ${tinHienThi.length}/${tatCaTin.length} tin`;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const oTimKiem = document.querySelector("#o-tim-kiem");
	const tuKhoaGoc = oTimKiem.value;
	const tuKhoa = tuKhoaGoc.toLowerCase();
	const dsTin = document.querySelectorAll("#list li");
	let soKhop = 0;

	dsTin.forEach(tin => {
		const tieuDe = tin.querySelector("h3").textContent.toLowerCase();
		const noiDung = tin.querySelector("p").textContent.toLowerCase();

		if (tieuDe.includes(tuKhoa) || noiDung.includes(tuKhoa)) {
			tin.classList.remove("an");
			soKhop++;
		} else {
			tin.classList.add("an");
		}
	});

	// Thông báo không tìm thấy
	const thongBao = document.querySelector("#khong-thay");
	if (soKhop === 0 && tuKhoa !== "") {
		// Dùng textContent để từ khoá hiện nguyên văn (không bị biên dịch HTML)
		thongBao.textContent = `Không tìm thấy tin nào cho "${tuKhoaGoc}"`;
		thongBao.classList.remove("an");
	} else {
		thongBao.classList.add("an");
	}

	capNhatBoDem();
}

document.querySelector("#o-tim-kiem").addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
document.querySelector("#list").addEventListener("click", (e) => {
	// Kiểm tra xem phần tử được bấm có phải là nút Read more không
	if (e.target.classList.contains("more")) {
		const nut = e.target;
		const theP = nut.parentNode.querySelector("p"); // Lấy thẻ p cùng cấp chứa nội dung tin

		if (theP.classList.contains("day-du")) {
			theP.classList.remove("day-du");
			nut.textContent = "Read more >>";
		} else {
			theP.classList.add("day-du");
			nut.textContent = "Thu gọn <<";
		}
	}
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
document.querySelector("#nut-dang").addEventListener("click", () => {
	const tieuDeInput = document.querySelector("#tin-tieu-de");
	const noiDungInput = document.querySelector("#tin-noi-dung");
	const baoLoi = document.querySelector("#bao-loi");

	// Kiểm tra rỗng
	if (tieuDeInput.value.trim() === "" || noiDungInput.value.trim() === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	// Xoá thông báo lỗi nếu hợp lệ
	baoLoi.textContent = "";

	// Tạo các phần tử DOM
	const li = document.createElement("li");
	
	const spanTime = document.createElement("span");
	spanTime.className = "time";
	spanTime.textContent = homNay(); // Gọi hàm có sẵn từ ho-tro.js
	
	const h3 = document.createElement("h3");
	h3.textContent = tieuDeInput.value; // Hiện nguyên văn
	
	const p = document.createElement("p");
	p.textContent = noiDungInput.value; // Hiện nguyên văn
	
	const button = document.createElement("button");
	button.type = "button";
	button.className = "more";
	button.textContent = "Read more >>";
	
	// Lắp ghép và chèn vào danh sách
	li.append(spanTime, h3, p, button);
	const list = document.querySelector("#list");
	list.prepend(li);
	
	// Làm sạch ô nhập
	tieuDeInput.value = "";
	noiDungInput.value = "";
	
	// Áp dụng lại bộ lọc hiện tại cho tin vừa đăng và cập nhật bộ đếm
	locTin();
});

// Khởi chạy bộ đếm ngay khi tải trang
capNhatBoDem();