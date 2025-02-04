const endpoint = 'http://localhost:3000';
const jwtToken = getCookie('jwtToken');
var myModal = new bootstrap.Modal(document.getElementById('createModal'));


getAllDepartment();

function CreateDepartment() {
    let department = document.getElementById('department').value;
    console.log(department);

    fetch(endpoint + '/create_Dept', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
            name: department
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.result) {
                getAllDepartment();
                myModal.hide();
            }
        });
}

function formatDate(timestamp) {
    const formatedDate = format(new Date(timestamp), "yyyy-MMMM-dd");
    return formatedDate;
}


function getAllDepartment() {
    fetch(endpoint + '/getAll_Dept', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
    })
        .then(res => res.json())
        .then(answer => {
            if (answer.result) {
                let row, no = 1;
                answer.data.forEach(element => {
                    row += `<tr>
                    <td class="ps-4">${no}</td>
                    <td>${element.name}</td>
                    <td>${moment(element.created_at).format('ll')}</td>
                    <td>${moment(element.updated_at).format('ll')}</td>
                    <td>
                        <span class="d-flex">
                             <!-- Delete Button -->
                              <div class="deleted me-2">
                                <a  href="#" class="text-danger">
                                    <i class="fa-regular fa-trash-can" data-bs-toggle="modal" data-bs-target="#deleteModal"></i> &nbsp;
                                 </a>
                              </div>
                             
                            
                             <!-- Modal -->
                             <div class="modal fade mb-4 style-modal" id="deleteModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content mb-4">
                                    <div class="modal-body pb-0 border-0">
                                        <div class="">
                                            <span class="fs-1 pb-2 "><i class="fa-solid fa-circle-exclamation"></i></span>
                                            <h3 class="fs-3 pb-0">លុបទិន្នន័យដេប៉ាតឺម៉ង់</h3>
                                            <p class="pt-0 mt-0 fs-4">Are you sure you want to delete this employee? This action cannot be undone.</p>
                                         </div>
                                    </div>
                                    <div class="modal-footer border-0 d-flex mb-4">
                                        <button type="button" class="btn btn-outline-dark  text-center" data-bs-dismiss="modal"> បោះបង់</button>
                                        <button type="button" class="btn btn-danger text-center" data-deptid="${element.id}" onclick="DeleteDepartment(this)"> លុប</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <!-- Edit Button -->
                             <div class="notification">
                                <a  href="#" class="icon-edit">
                                    <i class="fa-regular fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#editModal"></i>
                                 </a>
                             </div>
                            

                             <!-- Modal -->
                            <div class="modal fade mb-4" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content mb-4">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-4 fw-medium" id="editModalLabel">កែតម្រូវ​ ដេប៉ាតឺម៉ង់</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body pb-3 border-0">
                                       <form action="">
                                            <div class="mb-3">
                                                <label for="departmentinput" class="form-label">ដេប៉ាតឺម៉ង់</label>
                                                <input type="text" class="form-control bg-transparent fs-5" id="departmentinput" placeholder="អប់រំ">
                                            </div>
                                            <div class="mb-3 select position-relative">
                                                <label for="selectLeader" class="form-label">ប្រធាន</label>
                                                <i class="fa-solid fa-chevron-down"></i>
                                                <select  class="form-control bg-transparent fs-5 position-relative" name="selectLeader" id="selectLeader">
                                                   
                                                    <option value="អូន​ គីមហុង">អូន​ គីមហុង</option>
                                                    <option value="អូន​ គីមហុង">អូន​ គីមហុង</option>
                                                    <option value="អូន​ គីមហុង">អូន​ គីមហុង</option>
                                                </select>
                                               
                                            </div>
                                       </form>
                                    </div>
                                    <div class="modal-footer border-0 d-flex mb-4">
                                        <button type="button" class="btn btn-danger  text-center" data-bs-dismiss="modal"> <span class="me-3 text-center"><i class="fa-solid fa-x"></i></span>បោះបង់</button>
                                        <button type="button" class="btn btn-primary text-center"> <span class="me-3 text-center"><i class="fa-solid fa-download"></i></span>រក្សាទុក</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </span>
                    </td>
                </tr>`; no++;
                });
                document.getElementById('tbl_department').innerHTML = row;
            }
        });
}


function DeleteDepartment(id) {
    var delModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    let dept_id = id.dataset.deptid;
    fetch(endpoint + `/delete_Dept/${dept_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
    })
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                getAllDepartment();
                delModal.hide();
            }
        });
}