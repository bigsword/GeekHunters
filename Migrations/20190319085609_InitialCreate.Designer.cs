﻿// <auto-generated />
using GeekHunters.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GeekHunters.Migrations
{
    [DbContext(typeof(CandidateContext))]
    [Migration("20190319085609_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854");

            modelBuilder.Entity("GeekHunters.Models.Candidate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Candidate");
                });

            modelBuilder.Entity("GeekHunters.Models.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Skill");
                });

            modelBuilder.Entity("GeekHunters.Models.SkillMap", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CandidateId");

                    b.Property<int>("SkillId");

                    b.HasKey("Id");

                    b.HasIndex("CandidateId");

                    b.HasIndex("SkillId");

                    b.ToTable("SkillMap");
                });

            modelBuilder.Entity("GeekHunters.Models.SkillMap", b =>
                {
                    b.HasOne("GeekHunters.Models.Candidate", "Candidate")
                        .WithMany("Skills")
                        .HasForeignKey("CandidateId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GeekHunters.Models.Skill", "Skill")
                        .WithMany("Candidates")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
