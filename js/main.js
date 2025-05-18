$(document).ready(function() {
	// Header Scroll
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

		if (scroll >= 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});

	// Fancybox
	$('.work-box').fancybox();

	// Flexslider
	$('.flexslider').flexslider({
		animation: "fade",
		directionNav: false,
	});

	// Page Scroll
	var sections = $('section')
		nav = $('nav[role="navigation"]');

	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();
	  	sections.each(function() {
	    	var top = $(this).offset().top - 76
	        	bottom = top + $(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
	    	}
	  	});
	});
	nav.find('a').on('click', function () {
	  	var $el = $(this)
	    	id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 500);
	  return false;
	});

	// Mobile Navigation
	$('.nav-toggle').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});	
	nav.find('a').on('click', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});
	
	//Function to animate slider captions 
	function doAnimations( elems ) {
		//Cache the animationend event in a variable
		var animEndEv = 'webkitAnimationEnd animationend';
		
		elems.each(function () {
			var $this = $(this),
				$animationType = $this.data('animation');
			$this.addClass($animationType).one(animEndEv, function () {
				$this.removeClass($animationType);
			});
		});
	}
	//Variables on page load 
	var $myCarousel = $('#carousel-example-generic'),
		$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
		
	//Initialize carousel 
	$myCarousel.carousel();
	
	//Animate captions in first slide on page load 
	doAnimations($firstAnimatingElems);
	
	//Pause carousel  
	$myCarousel.carousel('pause');
	
	
	//Other slides to be animated on carousel slide event 
	$myCarousel.on('slide.bs.carousel', function (e) {
		var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
		doAnimations($animatingElems);
	});  
    $('#carousel-example-generic').carousel({
        interval:3000,
        pause: "false"
    });
	
});

async function add() {
	const nama = document.getElementById('name');
	const nama1 = nama.value; // Mendapatkan nilai dari input
	const pesan = document.getElementById('comments');
	const pesan1 = pesan.value;
	try {
		const response = await fetch(`https://script.google.com/macros/s/AKfycbxc2LFR6TrIubY5CC-F5Yfhi8PkF5XHmwv5gLi6BBWCiSD1gblpNp97BkQ-xhgfld6D/exec?action=add&table=firmanwish&data={"nama":"${nama1}","wish":"${pesan1}"}`, {
			method: 'GET', // Ganti dengan metode HTTP yang sesuai (POST, GET, dll.)
		});
		console.log(response);
		alert("pesan anda sudah terkirim!")
		nama.value = "";
		pesan.value = "";

		// Lakukan sesuatu dengan respons fetch jika diperlukan
		} catch (error) {
			console.log('Terjadi kesalahan:', error);
		}
}
// menjalankan fungsi fetch data ketika halaman di refresh

document.addEventListener('DOMContentLoaded', () => {
	fetchData();
});
// Fungsi untuk menampilkan data ke dalam elemen testimonial
function displayTestimonials(data) {
    const testimonialsContainer = $('#testimonials ul.slides');
    testimonialsContainer.empty(); // Kosongkan container sebelum menambahkan testimoni baru

    data.forEach(item => {
        const testimonial = `
            <li>
                <div class="col-md-12">
                    <blockquote>
                        <p>"${item.wish}"</p>
                        <p>${item.nama}</p>
                    </blockquote>
                </div>
            </li>
        `;
		console.log(testimonial)
        testimonialsContainer.append(testimonial);
    });

    // Inisialisasi ulang flexslider setelah menambahkan semua testimoni
    $('#testimonials .flexslider').flexslider({
        animation: "slide",
        smoothHeight: true,
		directionNav: false
    });
}

// ambil data semua wish
async function fetchData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxc2LFR6TrIubY5CC-F5Yfhi8PkF5XHmwv5gLi6BBWCiSD1gblpNp97BkQ-xhgfld6D/exec?table=firmanwish&action=getAll');
        const data = await response.json();
        console.log(data);
        if (data && Array.isArray(data)) { // Memastikan bahwa data adalah array sebelum menjalankan forEach
            displayTestimonials(data);
        } else {
            console.log('Data yang diterima bukan array atau undefined');
        }
    } catch (error) {
        console.log('Terjadi kesalahan:', error);
    }
}

