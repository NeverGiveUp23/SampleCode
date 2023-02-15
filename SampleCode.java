
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class StudentsApi {
    @Autowired
    private StudentRepository studentRepo;


    @GetMapping("/students")
    public List<Student> allStudents(){
        return studentRepo.findAll();
    }

    @PostMapping("/students")
    public Student createStudent(@RequestBody Student student){
        Student saveStudent = studentRepo.save(student);
        return saveStudent;
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity deleteStudent(@PathVariable("id") Long id){
        studentRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/students/{id}")
    public Student oneStudent(@PathVariable("id") Long id){
        return studentRepo.findById(id).orElseThrow(RuntimeException::new);
    }

    @PutMapping("/students/{id}")
    public ResponseEntity updateStudent(@PathVariable("id") Long id, @RequestBody Student student){
        Student foundStudent = studentRepo.findById(id).orElseThrow(RuntimeException::new);
        foundStudent.setName(student.getName());
        foundStudent.setEmail(student.getEmail());
        foundStudent = studentRepo.save(foundStudent);

        return ResponseEntity.ok(foundStudent);

    }
