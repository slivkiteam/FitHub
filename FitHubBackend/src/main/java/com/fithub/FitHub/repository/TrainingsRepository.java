package com.fithub.FitHub.repository;

import com.fithub.FitHub.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingsRepository extends JpaRepository<Train, Long>, JpaSpecificationExecutor<Train> {
    List<Train> findBookByTitleStartingWith(String title);
    Train findByTitle(String title);
    @Query("SELECT t FROM Train t ORDER BY t.used DESC LIMIT 3")
    List<Train> findTopThree();
}
