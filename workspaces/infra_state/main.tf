terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.68"
    }
  }
}

provider "aws" {
  region = "eu-west-1" 
}

resource "aws_s3_bucket" "bucket" {
  bucket = "es-tuner-terraform-state"
}