const loadPhone = async (phone = 13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );

  const data = await res.json();
  const Phones = data.data;
  displayPhone(Phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  //dispplay show all button if there are more then 12 phone
  const showButtonContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showButtonContainer.classList.remove("hidden");
  } else {
    showButtonContainer.classList.add("hidden");
  }
  //clear search
  phoneContainer.textContent = "";

  //diaplay phone first 12
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone.slug);
    const PhoneCard = document.createElement("div");
    PhoneCard.classList = `card card-compact  shadow-xl border-solid border-2 border-indigo-600 p-4 m-4 `;
    PhoneCard.innerHTML = `
    <figure>
            <img
              src="${phone.image}"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Do you want to learn more about exciting feture of latest ${phone.phone_name}</p>
            <div class="card-actions justify-end">
              <button onclick="handleSeeDetails('${phone.slug}')" class="btn btn-primary">See details</button>
            </div>
          </div>
    `;
    phoneContainer.appendChild(PhoneCard);
  });
  toggleSpinner(false);
};

const handleSeeDetails = async (id) => {
  // console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  displayDetailsPhone(phone);
};

const displayDetailsPhone = (phone) => {
  const modalContainer = document.getElementById("details-modal");
  modalContainer.innerHTML = `
   <dialog id="detail_modal" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
          <img class= m-4 src="${phone.image}" alt="">
            <h3 class="text-lg font-bold">${phone.name}</h3>
            <h5 class='text-sm font-bold'>${phone.brand}</h5>
            <p class="pt-4"><span class="font-bold">ChipSet:</span> ${phone?.mainFeatures?.chipSet}</p>
            
            <p class=""><span class="font-bold">Display:</span> ${phone?.mainFeatures?.displaySize}</p>
            
            <p class=""><span class="font-bold">Memory:</span> ${phone?.mainFeatures?.memory}</p>
            
            <p class=""><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
            
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
  `;
  console.log(phone);

  detail_modal.showModal();
};

const handleSearch = (isShowAll) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-input");
  const phoneName = searchField.value;
  // console.log(phoneName);
  loadPhone(phoneName, isShowAll);
};

const toggleSpinner = (isLoading) => {
  const spinnerContainer = document.getElementById("spinner-container");
  if (isLoading) {
    spinnerContainer.classList.remove("hidden");
  } else spinnerContainer.classList.add("hidden");
};

const seeAllHandler = () => {
  handleSearch(true);
};

loadPhone();
