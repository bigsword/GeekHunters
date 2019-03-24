using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GeekHunters.Models;

namespace GeekHunters.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CandidateController : Controller
  {
    private readonly CandidateContext _context;
    public CandidateController(CandidateContext context) 
    {
      _context = context;
    }

    [HttpGet]      
    public ActionResult<IEnumerable<Object>> GetCandidate()
    {
      return _context.Candidate
        .Include( c => c.Skills )
          .ThenInclude( s => s.Skill )
        .Select(c => new {
          id = c.Id,
          firstName = c.FirstName,
          lastName = c.LastName,
          skills = c.Skills.Select(s => s.Skill.Name)
        })
        .AsNoTracking()
        .ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<object> GetCandidateById(int id)
    {
      var candidate = _context.Candidate
        .Include( c => c.Skills )
          .ThenInclude( s => s.Skill )
        .Where(c => c.Id == id)
        .Select(c => new {
          id = c.Id,
          firstName = c.FirstName,
          lastName = c.LastName,
          skills = c.Skills.Select(s => s.Skill.Name)            
        })
        .AsNoTracking()
        .SingleOrDefault();

      if (candidate == null)
      {
        return NotFound();
      }
      else
      {
        return candidate;
      }
    }

    // TODO Candidates with the same name are currently allowed. 
    [HttpPost]
    public ActionResult<object> CreateGeek(CandidateViewModel candidateViewModel) 
    {
      if (!ModelState.IsValid)
      {
          return BadRequest(ModelState);
      }

      Candidate candidate = new Candidate {
        FirstName=candidateViewModel.FirstName,
        LastName=candidateViewModel.LastName
      };
      
      _context.Candidate.Add(candidate);
      _context.SaveChanges(); // to let candidate have Id.

      List<SkillMap> maps = new List<SkillMap>();      
      foreach (var name in candidateViewModel.Skills)
      {
        Skill skill = _context.Skill.Single(item => item.Name == name);
        maps.Add(new SkillMap {CandidateId = candidate.Id, SkillId = skill.Id}); 
      }

      _context.SkillMap.AddRange(maps);
      _context.SaveChanges();

      // prepare result.
      List<string> skills = new List<string>();
      foreach(var map in candidate.Skills)
      {
        skills.Add(map.Skill.Name);
      }

      return new {
        candidate.Id,
        candidate.FirstName,
        candidate.LastName,
        skills,        
      };
    }

    // SQLite doesn't have async call.
    [HttpGet("skill")]
    public ActionResult<IEnumerable<string>> GetSkillList()
    {
      var skills = _context.Skill
        .Select(s => s.Name)
        .ToList();
  
      if (skills == null)
      {
        return NotFound();
      }

      return skills;
    }
  }
}

