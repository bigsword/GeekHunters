using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace GeekHunters.Models
{
  public static class SeedData
  {
    public static void Initialize(IServiceProvider serviceProvider)
    {
      using (var context = new CandidateContext(
        serviceProvider.GetRequiredService<
          DbContextOptions<CandidateContext>>()))
      {
        // Look for any Skills.
        if (context.Skill.Any())
        {
            return;   // DB has been seeded
        }

        context.Skill.AddRange(
            new Skill { Name = "C#" }, 
            new Skill { Name = "SQL" }, 
            new Skill { Name = "JavaScript" },
            new Skill { Name = "Java" },
            new Skill { Name = "Python" }
        );

        context.Candidate.AddRange(
          new Candidate 
          {
            FirstName = "Jon",
            LastName = "Snow",
          },

          new Candidate 
          {
            FirstName = "Daenerys",
            LastName = "Tangaryen",
          }
        );

        context.SaveChanges();

        context.SkillMap.AddRange(
          new SkillMap
          {
            CandidateId = context.Candidate.Single( item => item.FirstName == "Jon" ).Id,
            SkillId = context.Skill.Single( item => item.Name == "SQL" ).Id
          },

          new SkillMap
          {
            CandidateId = context.Candidate.Single( item => item.FirstName == "Jon" ).Id,
            SkillId = context.Skill.Single( item => item.Name == "Python" ).Id
          },

          new SkillMap
          {
            CandidateId = context.Candidate.Single(item => item.FirstName == "Daenerys").Id,
            SkillId = context.Skill.Single( item => item.Name == "C#").Id
          },

          new SkillMap
          {
            CandidateId = context.Candidate.Single(item => item.FirstName == "Daenerys").Id,
            SkillId = context.Skill.Single(item => item.Name == "Java").Id
          }
        );

        context.SaveChanges();
      }
    }
  }
}