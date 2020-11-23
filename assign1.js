// JavaScript source code
document.addEventListener("DOMContentLoaded", function () {
    const galleryAPI = "https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php";
    let galleryPaintings = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/paintings.php?gallery=';
    
    let galleryList = document.querySelector(".galleryList");

    window.addEventListener('load', async () => {
        const response = await fetch(galleryAPI);
        const galleries = await response.json();

        document.querySelector('.loader').style.display = "none";

        galleries.forEach( g => {
            const list = document.createElement('li');
            list.textContent = g.GalleryName;
            galleryList.appendChild(list);

            list.addEventListener('click', (e) => {
                const galleryTemp = galleryPaintings;
                const galleryName = document.querySelector('#galleryName');
                const galleryNative = document.querySelector('#galleryNativeName');
                const galleryCity = document.querySelector('#galleryCity');
                const galleryAddress = document.querySelector('#galleryAddress');
                const galleryLink = document.querySelector('#galleryLink');

                galleryName.textContent = g.GalleryName;
                galleryNative.textContent = g.GalleryNativeName;
                galleryCity.textContent = g.GalleryCity;
                galleryAddress.textContent = g.GalleryAddress;
                galleryLink.innerHTML = '<a href="' + g.GalleryWebSite + '">' + g.GalleryWebSite + '</a>';

                galleryPaintings += g.GalleryID;
                console.log(galleryPaintings);
                fetch(galleryPaintings).then(response => response.json()).then((data) => { getPainting(data) });
                
                galleryPaintings = galleryTemp;
                                
            });
        });
    });
    const buttonList = document.querySelector('.toggleList');
    buttonList.addEventListener('click', (e) => {
        const galleryBar = document.querySelector('.galleryBar');
        const galleryInfo = document.querySelector('.galleryInfo');
        const galleryMap = document.querySelector('.galleryMap');
        const paintings = document.querySelector('.paintings');

        if (galleryBar.style.display === "block") {
            galleryBar.style.display = "none";
            galleryInfo.style.gridColumn = "1 / span 1";
            galleryMap.style.gridColumn = "1 / span 1";
            paintings.style.gridColumn = "2 / span 2";
        } else {
            galleryBar.style.display = "block";
            galleryInfo.style.gridColumn = "2 / span 1";
            galleryMap.style.gridColumn = "2 / span 1";
            paintings.style.gridColumn = "3 / span 2";
        }
    });

    var map;
    function initMap(galleryLong, galleryLat) {
       map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: galleryLat, lng: galleryLong },
            zoom: 18
        });
    }

    function singleView(imgSrc)   {
        const singleSection = document.querySelector('.singleSection');
        const singleImg = document.createElement('img');
        singleImg.setAttribute('src', 'imgSrc.src');
        singleSection.appendChild(singleImg);
    }

    function getPainting(paintings) {
       // const galleryMap = document.querySelector('#galleryMap');
       galleryList.addEventListener('click', (e) => {
            tbody.innerHTML = "";
       });
       const tbody = document.querySelector('tbody');
        for (let p of paintings) {
            const galleryLong = p.Longitude;
            const galleryLat = p.Latitude;
            const paintingList = document.querySelector('#paintingsList');

            initMap(galleryLong, galleryLat);
            
            let paintingURL = "https://res.cloudinary.com/funwebdev/image/upload/w_75/art/paintings/square/" + p.ImageFileName;
            const artistName = p.FirstName + " " + p.LastName;      
            let painting = '<img class="tableImage" src="' + paintingURL + '" onclick="singleView(this);" />';
            const paintingArray = ["", artistName, p.Title, p.YearOfWork];
            const row = tbody.insertRow();
            
            //Similar code found on https://stackoverflow.com/questions/20407781/dynamically-generated-table-using-an-array-to-fill-in-td-values
            for (i = 0; i < paintingArray.length; i++) {

                const cell = document.createElement('td');
                if (i === 0) {
                    cell.innerHTML = painting;
                    tbody.appendChild(cell);
                }
                cell.appendChild(document.createTextNode(paintingArray[i]));
                row.appendChild(cell);
            }
            tbody.appendChild(row);

           // const tableImage = document.querySelector('.tableImage');
           

           

        }


    }
});      
