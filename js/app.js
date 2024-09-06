const loadPhone = async (phone) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );

  const data = await res.json();
  const Phones = data.data;
  displayPhone(Phones);
};

const displayPhone = (phones) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  //dispplay show all button if there are more then 12 phone

  const showButtonContainer = document.getElementById("show-all-container");
  if (phones.length > 12) {
    showButtonContainer.classList.remove("hidden");
  } else {
    showButtonContainer.classList.add("hidden");
  }
  //clear search
  phoneContainer.textContent = "";

  //diaplay phone first 12
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    // console.log(phone);
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
              <button class="btn btn-primary">See details</button>
            </div>
          </div>
    `;
    phoneContainer.appendChild(PhoneCard);
  });
};

const handleSearch = () => {
  const searchField = document.getElementById("search-input");
  const phoneName = searchField.value;
  // console.log(phoneName);
  loadPhone(phoneName);
};

// loadPhone();
