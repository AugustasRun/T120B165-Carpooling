﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using T120B165_TaxiDispatcher.Models;

#nullable disable

namespace T120B165_TaxiDispatcher.Migrations
{
    [DbContext(typeof(TaxiDispatcherContext))]
    [Migration("20221009162541_CreateTaxiDispatcherDB")]
    partial class CreateTaxiDispatcherDB
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("T120B165_TaxiDispatcher.Models.DispatchCenter", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DispatchCenters");
                });

            modelBuilder.Entity("T120B165_TaxiDispatcher.Models.Driver", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<DateTime>("StartedDriving")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("StartedWorking")
                        .HasColumnType("datetime");

                    b.Property<int>("WorkingFor")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WorkingFor");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("T120B165_TaxiDispatcher.Models.Route", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<int>("DriverId")
                        .HasColumnType("int");

                    b.Property<string>("From")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime");

                    b.Property<string>("To")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DriverId");

                    b.ToTable("Routes");
                });

            modelBuilder.Entity("T120B165_TaxiDispatcher.Models.Driver", b =>
                {
                    b.HasOne("T120B165_TaxiDispatcher.Models.DispatchCenter", "WorkingForNavigation")
                        .WithMany("Drivers")
                        .HasForeignKey("WorkingFor")
                        .IsRequired()
                        .HasConstraintName("Fk_WorkingFor");

                    b.Navigation("WorkingForNavigation");
                });

            modelBuilder.Entity("T120B165_TaxiDispatcher.Models.Route", b =>
                {
                    b.HasOne("T120B165_TaxiDispatcher.Models.Driver", "Driver")
                        .WithMany("Routes")
                        .HasForeignKey("DriverId")
                        .IsRequired()
                        .HasConstraintName("FK_driverID");

                    b.Navigation("Driver");
                });

            modelBuilder.Entity("T120B165_TaxiDispatcher.Models.DispatchCenter", b =>
                {
                    b.Navigation("Drivers");
                });

            modelBuilder.Entity("T120B165_TaxiDispatcher.Models.Driver", b =>
                {
                    b.Navigation("Routes");
                });
#pragma warning restore 612, 618
        }
    }
}
