using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GeekHunters.Models
{
  public class CandidateContext : DbContext
  {
    public CandidateContext (DbContextOptions<CandidateContext> options)
      : base(options)
    {
    }
    public DbSet<Candidate> Candidate { get; set; }
    public DbSet<Skill> Skill { get; set; }

    public DbSet<SkillMap> SkillMap { get; set; }
  }

  public class Candidate 
  {
    public int Id { get; set; }

    [Required]
    [StringLength(50, MinimumLength=1)]
    public string FirstName  { get; set; }

    [Required]
    [StringLength(50, MinimumLength=1)]
    public string LastName { get; set; }

    public virtual ICollection<SkillMap> Skills { get; set; }
  }

  public class CandidateViewModel 
  {
    [Required]
    [StringLength(50, MinimumLength=1)]
    public string FirstName  { get; set; }
    [Required]
    [StringLength(50, MinimumLength=1)]
    public string LastName  { get; set; }

    [Required]
    public string[] Skills { get; set; }

  }

  public class Skill 
  {
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    public virtual ICollection<SkillMap> Candidates { get; set; }
  }

  public class SkillMap
  {
    public int Id { get; set; }
    public int CandidateId { get; set; }
    public int SkillId { get; set; }

    public virtual Candidate Candidate { get; set; }

    public virtual Skill Skill { get; set; }
  }
}