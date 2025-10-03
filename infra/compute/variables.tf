variable "compartment_ocid" {}
variable "cloudflare_api_token" {}
variable "cloudflare_zone_id" {}
variable "subnet_id" {}
variable "ubuntu_image_id" {
  default = "ocid1.image.oc1.eu-stockholm-1.aaaaaaaam6t7hfwppnu4ki6eej4kfytqfapcsrtuyu5r2rqybidhtr6k54ja"
}
variable "vm_shape" {
  default = "VM.Standard.E2.1.Micro"
}

variable "instances" {
  type = map(object({
    display_name       = string
    api_subdomain      = string
    frontend_subdomain = string
    domain             = optional(string, "sammosios.com")
  }))

  default = {
    dev = {
      display_name       = "dev.sep"
      frontend_subdomain = "dev.sep"
      api_subdomain      = "api.dev.sep"
    }
    prod = {
      display_name       = "sep"
      frontend_subdomain = "sep"
      api_subdomain      = "api.sep"
    }
  }
}
