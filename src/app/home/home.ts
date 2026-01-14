import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit{
  contactInfo = {
    phone: '+212 6 39 42 31 28',
    whatsapp: '+212 6 39 42 31 28',
    email: 'contact@societe.com'
  };

  ngAfterViewInit(): void {
    this.addClickEventsToSwipers();
  }

  // Add click event to all swiper containers
  addClickEventsToSwipers(): void {
    // Get all swiper containers with the class 'card-swiper'
    const swiperContainers = document.querySelectorAll('swiper-container.card-swiper');
    
    swiperContainers.forEach(swiper => {
      // Make the entire swiper container clickable
      swiper.addEventListener('click', (event) => {
        // Get the product name from data attribute
        const productName = (swiper as HTMLElement).dataset['productName'];
        
        if (productName) {
          this.showContactAlert(productName);
        }
      });
      
    });
  }

  // Show SweetAlert with contact information
  showContactAlert(productName: string): void {
    Swal.fire({
      title: `Intéressé par ${productName} ?`,
      html: `
        <div style="text-align: left; padding: 15px 0;">
          <p>Pour plus d'informations ou pour commander le <strong>${productName}</strong>, contactez-nous :</p>
          <div style="margin-top: 20px;">
            <p style="margin-bottom: 10px;">
              <i class="bi bi-telephone" style="color: #106eea; margin-right: 10px;"></i>
              <strong>Téléphone :</strong> ${this.contactInfo.phone}
            </p>
            <p style="margin-bottom: 10px;">
              <i class="bi bi-whatsapp" style="color: #25D366; margin-right: 10px;"></i>
              <strong>WhatsApp :</strong> ${this.contactInfo.whatsapp}
            </p>
            <p>
              <i class="bi bi-envelope" style="color: #dc3545; margin-right: 10px;"></i>
              <strong>Email :</strong> ${this.contactInfo.email}
            </p>
          </div>
        </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#106eea',
      cancelButtonColor: '#25D366',
      confirmButtonText: '<i class="bi bi-telephone me-1"></i> Appeler',
      cancelButtonText: '<i class="bi bi-whatsapp me-1"></i> WhatsApp',
      showDenyButton: true,
      denyButtonText: '<i class="bi bi-envelope me-1"></i> Email',
      denyButtonColor: '#dc3545',
      showCloseButton: true,
      width: '500px'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call phone
        window.open(`tel:${this.contactInfo.phone}`, '_self');
      } else if (result.isDenied) {
        // Send email
        window.open(`mailto:${this.contactInfo.email}?subject=Demande d'information: ${productName}`, '_self');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Open WhatsApp
        const message = encodeURIComponent(`Bonjour, je suis intéressé par le produit ${productName}. Pouvez-vous m'envoyer plus d'informations ?`);
        window.open(`https://wa.me/${this.contactInfo.whatsapp.replace(/\s/g, '')}?text=${message}`, '_blank');
      }
    });
  }
}
