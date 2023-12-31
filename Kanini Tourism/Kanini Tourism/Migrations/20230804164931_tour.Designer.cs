﻿// <auto-generated />
using System;
using Kanini_Tourism.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Kanini_Tourism.Migrations
{
    [DbContext(typeof(TourDBContext))]
    [Migration("20230804164931_tour")]
    partial class tour
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Kanini_Tourism.Models.Booking", b =>
                {
                    b.Property<int>("BookingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BookingId"));

                    b.Property<int>("Adult")
                        .HasColumnType("int");

                    b.Property<int>("Child")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("HotelId")
                        .HasColumnType("int");

                    b.Property<int?>("HotelsHotelId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<double>("Phone_Number")
                        .HasColumnType("float");

                    b.Property<int>("RestaurentId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("TotalPrice")
                        .HasColumnType("int");

                    b.Property<int?>("TourPackagePackageId")
                        .HasColumnType("int");

                    b.HasKey("BookingId");

                    b.HasIndex("HotelsHotelId");

                    b.HasIndex("RestaurentId");

                    b.HasIndex("TourPackagePackageId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.Dummy", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Agency_Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Phone_Number")
                        .HasColumnType("float");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Dummy");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.Feedback", b =>
                {
                    b.Property<int>("FeedId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("FeedId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("FeedId");

                    b.HasIndex("UserId");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.Hotels", b =>
                {
                    b.Property<int>("HotelId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("HotelId"));

                    b.Property<string>("HotelImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HotelName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int?>("TourpackagePackageId")
                        .HasColumnType("int");

                    b.HasKey("HotelId");

                    b.HasIndex("TourpackagePackageId");

                    b.ToTable("Hotels");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.ImageGallery", b =>
                {
                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Image");

                    b.ToTable("ImageGallery");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.Imagetbl", b =>
                {
                    b.Property<int>("Imgid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Imgid"));

                    b.Property<string>("Imgname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Imgid");

                    b.ToTable("Imagetbls");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.Restaurent", b =>
                {
                    b.Property<int>("RestaurentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RestaurentId"));

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<string>("RestaurentImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RestaurentName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TourpackagePackageId")
                        .HasColumnType("int");

                    b.HasKey("RestaurentId");

                    b.HasIndex("TourpackagePackageId");

                    b.ToTable("Restaurents");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.Spots", b =>
                {
                    b.Property<int>("SpotId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SpotId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<string>("SpotImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SpotName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TourpackagePackageId")
                        .HasColumnType("int");

                    b.HasKey("SpotId");

                    b.HasIndex("TourpackagePackageId");

                    b.ToTable("Spots");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.TourPackage", b =>
                {
                    b.Property<int>("PackageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PackageId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Destination")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<string>("PackImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PackageName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PriceForAdult")
                        .HasColumnType("int");

                    b.Property<int>("PriceForChild")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId1")
                        .HasColumnType("int");

                    b.HasKey("PackageId");

                    b.HasIndex("UserId1");

                    b.ToTable("TourPackages");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Agency_Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Phone_Number")
                        .HasColumnType("float");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.Booking", b =>
                {
                    b.HasOne("Kanini_Tourism.Models.Hotels", "Hotels")
                        .WithMany()
                        .HasForeignKey("HotelsHotelId");

                    b.HasOne("Kanini_Tourism.Models.Restaurent", "Restaurents")
                        .WithMany()
                        .HasForeignKey("RestaurentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Kanini_Tourism.Models.TourPackage", "TourPackage")
                        .WithMany("Bookings")
                        .HasForeignKey("TourPackagePackageId");

                    b.Navigation("Hotels");

                    b.Navigation("Restaurents");

                    b.Navigation("TourPackage");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.Feedback", b =>
                {
                    b.HasOne("Kanini_Tourism.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.Hotels", b =>
                {
                    b.HasOne("Kanini_Tourism.Models.TourPackage", "Tourpackage")
                        .WithMany("Hotels")
                        .HasForeignKey("TourpackagePackageId");

                    b.Navigation("Tourpackage");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.Restaurent", b =>
                {
                    b.HasOne("Kanini_Tourism.Models.TourPackage", "Tourpackage")
                        .WithMany("Restaurents")
                        .HasForeignKey("TourpackagePackageId");

                    b.Navigation("Tourpackage");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.Spots", b =>
                {
                    b.HasOne("Kanini_Tourism.Models.TourPackage", "Tourpackage")
                        .WithMany("Nearbyspots")
                        .HasForeignKey("TourpackagePackageId");

                    b.Navigation("Tourpackage");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.TourPackage", b =>
                {
                    b.HasOne("Kanini_Tourism.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId1");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Kanini_Tourism.Models.TourPackage", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("Hotels");

                    b.Navigation("Nearbyspots");

                    b.Navigation("Restaurents");
                });
#pragma warning restore 612, 618
        }
    }
}
