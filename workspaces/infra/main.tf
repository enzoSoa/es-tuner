terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.68"
    }
  }
  backend "s3" {
    bucket = "es-tuner-terraform-state"
    key = "terraform.tfstate"
    region = "eu-west-1" 
  }
}

provider "aws" {
  region = "eu-west-1" 
}

resource "aws_s3_bucket" "bucket" {
  bucket = "es-tuner"
  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "bucket_ownership_control" {
  bucket = aws_s3_bucket.bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.bucket_ownership_control]
  bucket = aws_s3_bucket.bucket.id
  acl = "private"
}

resource "aws_s3_object" "root_bucket_object" {
    for_each        = fileset("../frontend/dist/", "*")
    bucket          = aws_s3_bucket.bucket.id
    key             = each.value
    source          = "../frontend/dist/${each.value}"
    etag            = filemd5("../frontend/dist/${each.value}")
}

resource "aws_s3_object" "assets_bucket_object" {
    for_each        = fileset("../frontend/dist/assets/", "*")
    bucket          = aws_s3_bucket.bucket.id
    key             = "assets/${each.value}"
    source          = "../frontend/dist/assets/${each.value}"
    etag            = filemd5("../frontend/dist/assets/${each.value}")
}
